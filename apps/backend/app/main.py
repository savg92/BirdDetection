"""FastAPI application entrypoint."""

from __future__ import annotations

from io import BytesIO
from contextlib import asynccontextmanager
from pathlib import Path
from uuid import uuid4

from fastapi import Depends, FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

from app.database import Base, engine, get_db
from app.inference import ModelService
from app.models import Sighting
from app.schemas import PredictResponse, SightingResponse

BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BASE_DIR / "static"
UPLOADS_DIR = STATIC_DIR / "uploads"
MODELS_DIR = BASE_DIR / "models"
MAX_UPLOAD_BYTES = 10 * 1024 * 1024

UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
MODELS_DIR.mkdir(parents=True, exist_ok=True)

model_service = ModelService(MODELS_DIR)


@asynccontextmanager
async def lifespan(_: FastAPI):
    """Initialize database and ML model once on app startup."""
    Base.metadata.create_all(bind=engine)
    model_service.load()
    yield


app = FastAPI(title="Bird Detection API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")


@app.get("/health")
def health() -> dict[str, str | bool]:
    """Return backend health and model readiness."""
    return {"status": "ok", "model_ready": model_service.is_ready}


@app.post("/predict", response_model=PredictResponse)
async def predict(file: UploadFile = File(...), db: Session = Depends(get_db)) -> PredictResponse:
    """Run image inference and persist sighting data to SQLite."""
    if file.content_type is None or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Unsupported file type. Please upload an image.")

    if not model_service.is_ready:
        raise HTTPException(
            status_code=503,
            detail=(
                "Model artifacts are not loaded. Run training and place bird_model.pth "
                "and label_list.json in apps/backend/models/."
            ),
        )

    extension = Path(file.filename or "upload.jpg").suffix or ".jpg"
    filename = f"{uuid4().hex}{extension}"
    target_path = UPLOADS_DIR / filename

    content = await file.read()
    if len(content) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="Image too large. Max size is 10 MB.")

    try:
        Image.open(BytesIO(content)).verify()
    except (UnidentifiedImageError, OSError) as exc:
        raise HTTPException(status_code=400, detail="Invalid image payload.") from exc

    target_path.write_bytes(content)

    predictions = model_service.predict_top_5(target_path)
    top = predictions[0]
    is_uncertain = float(top["probability"]) < 0.30
    filepath = f"/static/uploads/{filename}"

    sighting = Sighting(
        filepath=filepath,
        top_species=str(top["species"]),
        probability=float(top["probability"]),
        is_uncertain=is_uncertain,
    )
    db.add(sighting)
    db.commit()
    db.refresh(sighting)

    return PredictResponse(
        top_5=predictions,
        top_species=str(top["species"]),
        probability=float(top["probability"]),
        is_uncertain=is_uncertain,
        filepath=filepath,
    )


@app.get("/history", response_model=list[SightingResponse])
def history(db: Session = Depends(get_db)) -> list[SightingResponse]:
    """Return persisted sightings ordered by latest first."""
    return db.query(Sighting).order_by(Sighting.timestamp.desc()).all()


@app.get("/images/{filename}")
def image_url(filename: str) -> dict[str, str]:
    """Return a static URL for uploaded image filename."""
    return {"url": f"/static/uploads/{filename}"}
