# Implementation Plan - Phase 2: ML Training Pipeline

## Phase 2: ML Training Pipeline

- [x] Task: Dataset & Preprocessing
  - [x] Create `training/train.ipynb` with CUB-200-2011 download and extraction logic.
  - [x] Implement a custom PyTorch DataLoader with 224x224 RGB normalization and 20% validation split.
- [x] Task: Model Training & Artifact Export
  - [x] Implement EfficientNet-B0 transfer learning (200 bird classes) with pre-trained weights.
  - [x] Implement training loop, best model saving, and artifact export (`bird_model.pth`, `label_list.json`).
  - [x] Implement the automation script to move artifacts to `../apps/backend/models/`.
- [~] Task: Conductor - User Manual Verification 'Phase 2: ML Training Pipeline' (Protocol in workflow.md)
