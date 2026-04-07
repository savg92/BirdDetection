"""Inference utilities for bird classification."""

from __future__ import annotations

import json
from pathlib import Path

import torch
from PIL import Image
from torchvision import models, transforms

IMAGE_SIZE = 224
IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD = [0.229, 0.224, 0.225]


class ModelService:
    """Loads model artifacts once and serves prediction calls."""

    def __init__(self, models_dir: Path) -> None:
        self.models_dir = models_dir
        self.model_path = self.models_dir / "bird_model.pth"
        self.labels_path = self.models_dir / "label_list.json"
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model: torch.nn.Module | None = None
        self.labels: list[str] = []
        self.transform = transforms.Compose(
            [
                transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
                transforms.ToTensor(),
                transforms.Normalize(mean=IMAGENET_MEAN, std=IMAGENET_STD),
            ]
        )

    def load(self) -> None:
        """Load model and label artifacts from disk.

        If artifacts are not present yet, the service remains unavailable for predict.
        """
        if self.labels_path.exists():
            self.labels = json.loads(self.labels_path.read_text(encoding="utf-8"))

        if not self.model_path.exists():
            self.model = None
            return

        num_classes = len(self.labels) if self.labels else 200
        model = models.efficientnet_b0(weights=None)
        in_features = model.classifier[1].in_features
        model.classifier[1] = torch.nn.Linear(in_features, num_classes)

        state_dict = torch.load(self.model_path, map_location=self.device)
        model.load_state_dict(state_dict)
        model.to(self.device)
        model.eval()
        self.model = model

    @property
    def is_ready(self) -> bool:
        """Return whether model is available for inference."""
        return self.model is not None and bool(self.labels)

    @torch.inference_mode()
    def predict_top_5(self, image_path: Path) -> list[dict[str, float | str]]:
        """Run inference and return Top-5 species predictions."""
        if not self.is_ready:
            raise RuntimeError("Model artifacts are not loaded. Run training first.")

        image = Image.open(image_path).convert("RGB")
        tensor = self.transform(image).unsqueeze(0).to(self.device)

        logits = self.model(tensor)
        probs = torch.softmax(logits, dim=1)
        top_probs, top_indices = torch.topk(probs, k=5, dim=1)

        predictions: list[dict[str, float | str]] = []
        for prob, idx in zip(top_probs[0].tolist(), top_indices[0].tolist()):
            species = self.labels[idx] if idx < len(self.labels) else f"class_{idx}"
            predictions.append({"species": species, "probability": float(prob)})

        return predictions
