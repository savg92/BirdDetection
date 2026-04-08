# Specification: Phase 2: ML Training Pipeline

## Overview
This track focuses on implementing the machine learning training pipeline using EfficientNet-B0 and the CUB-200-2011 dataset, optimized for execution in Jupyter Notebooks (e.g., Google Colab).

## Functional Requirements
- **Jupyter Notebook (`training/train.ipynb`)**:
    - Cell-by-cell implementation of the entire training pipeline.
    - Automated download and extraction of the CUB-200-2011 dataset.
- **Model Training**:
    - Transfer Learning using EfficientNet-B0 with pre-trained ImageNet weights.
    - Custom classifier head for 200 bird species.
    - Custom PyTorch DataLoader with 224x224 RGB resizing and standard ImageNet normalization.
    - 20% validation split for performance tracking.
- **Artifact Management**:
    - Export `bird_model.pth` (best model weights) and `label_list.json` (species names).
    - Automation script in the notebook to move artifacts directly to `../apps/backend/models/`.

## Non-Functional Requirements
- **Target Accuracy**: Baseline accuracy of at least 70% on the validation set.
- **Environment Compatibility**: Optimized for Google Colab GPU instances.

## Acceptance Criteria
- [ ] `training/train.ipynb` contains the full, functional training logic.
- [ ] Dataset is correctly downloaded and extracted within the notebook.
- [ ] Model trains successfully and achieves the target accuracy.
- [ ] `bird_model.pth` and `label_list.json` are generated and moved to the backend's models directory.

## Out of Scope
- Implementation of the FastAPI backend or inference endpoints (Phase 3).
- Implementation of the frontend dashboard or history gallery (Phase 4).

## FastAPI API documentation reference

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- OpenAPI schema: `http://localhost:8000/openapi.json`
