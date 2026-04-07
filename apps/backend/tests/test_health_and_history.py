"""Basic API tests for backend health and history endpoints."""

from io import BytesIO

from PIL import Image
from fastapi.testclient import TestClient

from app.main import app, model_service


def _make_png_bytes() -> bytes:
    image = Image.new("RGB", (32, 32), color="green")
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    return buffer.getvalue()


def test_health_endpoint() -> None:
    """Health endpoint should return service status."""
    with TestClient(app) as client:
        response = client.get("/health")

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"
    assert "model_ready" in payload


def test_history_endpoint_returns_list() -> None:
    """History endpoint should always return a list payload."""
    with TestClient(app) as client:
        response = client.get("/history")

    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_predict_rejects_non_image_content_type() -> None:
    """Predict endpoint should reject non-image uploads."""
    with TestClient(app) as client:
        response = client.post(
            "/predict",
            files={"file": ("note.txt", b"hello", "text/plain")},
        )

    assert response.status_code == 400


def test_predict_rejects_invalid_image_payload(monkeypatch) -> None:
    """Predict endpoint should reject invalid image bytes even when content type is image."""
    with TestClient(app) as client:
        monkeypatch.setattr(model_service, "model", object())
        monkeypatch.setattr(model_service, "labels", ["placeholder"])
        response = client.post(
            "/predict",
            files={"file": ("broken.png", b"not-an-image", "image/png")},
        )

    assert response.status_code == 400


def test_predict_returns_top5_and_persists(monkeypatch) -> None:
    """Predict endpoint should return Top 5 and create a history record."""

    def fake_predict_top_5(_):
        return [
            {"species": "Northern Cardinal", "probability": 0.82},
            {"species": "Blue Jay", "probability": 0.08},
            {"species": "American Robin", "probability": 0.05},
            {"species": "Goldfinch", "probability": 0.03},
            {"species": "Sparrow", "probability": 0.02},
        ]

    with TestClient(app) as client:
        monkeypatch.setattr(model_service, "model", object())
        monkeypatch.setattr(model_service, "labels", ["placeholder"])
        monkeypatch.setattr(model_service, "predict_top_5", fake_predict_top_5)

        payload = _make_png_bytes()
        response = client.post(
            "/predict",
            files={"file": ("bird.png", payload, "image/png")},
        )

        assert response.status_code == 200
        body = response.json()
        assert body["top_species"] == "Northern Cardinal"
        assert body["is_uncertain"] is False
        assert len(body["top_5"]) == 5

        history = client.get("/history")
        assert history.status_code == 200
        assert isinstance(history.json(), list)
        assert len(history.json()) >= 1
