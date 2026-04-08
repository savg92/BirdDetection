# Bird Detection Monorepo

Production-ready hybrid monorepo for fine-grained bird species recognition (CUB-200-2011, 200 classes). Includes a pretrained PyTorch CNN checkpoint (EfficientNet-B0) and label mapping located at `apps/backend/models/bird_model.pth` and `apps/backend/models/label_list.json`. It bundles:

- A FastAPI inference service with SQLite-backed sighting history and static uploads.
- A React + Vite dashboard for image upload, Top-5 predictions, and historical views.
- A reproducible training notebook (transfer learning with EfficientNet-B0) that exports model artifacts and labels.

Designed for local development, easy deployment, and GPU-backed training workflows (Colab or remote kernels).

## Structure

- `apps/backend` — FastAPI inference API + SQLite history
- `apps/frontend` — React + Vite dashboard (TanStack Router)
- `training` — Jupyter notebook training pipeline
- `conductor` — product, workflow, and phase plans

## Prerequisites

- Python 3.10+
- [`uv`](https://docs.astral.sh/uv/)
- [`bun`](https://bun.sh/)

## Quick start

1. Install dependencies:
   - `make install`
2. Start both backend and frontend:
   - `make dev`
3. Backend URL:
   - `http://localhost:8000`
4. Frontend URL:
   - `http://localhost:5173`

## Training workflow

Open `training/train.ipynb` and run cells in order. The notebook:

- Downloads/extracts CUB-200-2011 when missing
- Trains EfficientNet-B0 (transfer learning)
- Exports `bird_model.pth` and `label_list.json`
- Copies artifacts to `apps/backend/models/`

## Model artifacts

This repository includes the trained model and label mapping used by the backend inference service:

- `apps/backend/models/bird_model.pth` — PyTorch checkpoint (EfficientNet-B0, transfer-learned on CUB-200-2011). Replace this file with your own trained checkpoint to change the served model.
- `apps/backend/models/label_list.json` — JSON array mapping class indices to human-readable labels (200 classes from CUB-200-2011).

Usage notes:

- The backend loads the model from `apps/backend/models/` at startup. If you replace these files while the server is running, restart the backend to pick up the new artifacts.
- To generate new artifacts, run `training/train.ipynb` (GPU recommended) and copy the produced `bird_model.pth` and `label_list.json` into `apps/backend/models/`.
- See `apps/backend/app/inference.py` for the exact model-loading and preprocessing steps if you need to adapt the model format or input pipeline.

## VS Code + Google Colab GPU integration

### Option A: Use Colab notebook + sync artifacts

1. Open Google Colab and upload/import `training/train.ipynb`.
2. In Colab, set runtime to GPU (`Runtime -> Change runtime type -> T4/A100 if available`).
3. Run all notebook cells.
4. Download generated artifacts (`bird_model.pth`, `label_list.json`).
5. Place them into `apps/backend/models/` locally.

### Option B: Connect VS Code to remote runtime (SSH style workflow)

1. Use a remote machine/Jupyter host with GPU (Colab-compatible alternatives often expose SSH/Jupyter endpoints).
2. In VS Code, install:
   - Jupyter extension
   - Python extension
3. Use Command Palette: `Jupyter: Specify Jupyter Server for Connections`.
4. Paste the remote Jupyter server URL/token.
5. Open `training/train.ipynb` and run cells against that kernel.

> Note: Native, direct SSH into standard free Colab instances is not always available. The most reliable workflow is running training in Colab and syncing artifacts back to this repo.

## API summary

- `POST /predict` — upload an image and receive Top 5 predictions
- `GET /history` — retrieve saved sightings
- Static uploads are served from `/static/uploads/...`

## FastAPI API documentation

When the backend is running (`make dev`), interactive API docs are available at:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- OpenAPI schema: `http://localhost:8000/openapi.json`

## Frontend API configuration

- `apps/frontend/.env.example` includes:
  - `VITE_API_BASE_URL=http://localhost:8000`
- Copy it to `.env` (already created locally) to override backend URL if needed.

## Development checks

- `make check` (backend lint + tests, frontend lint + typecheck)
