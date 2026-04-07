# Implementation Plan - Phase 2: ML Training Pipeline

## Phase 2: ML Training Pipeline
- [ ] Task: Dataset & Preprocessing
    - [ ] Create `training/train.ipynb` with CUB-200-2011 download and extraction logic.
    - [ ] Implement a custom PyTorch DataLoader with 224x224 RGB normalization and 20% validation split.
- [ ] Task: Model Training & Artifact Export
    - [ ] Implement EfficientNet-B0 transfer learning (200 bird classes) with pre-trained weights.
    - [ ] Implement training loop, best model saving, and artifact export (`bird_model.pth`, `label_list.json`).
    - [ ] Implement the automation script to move artifacts to `../apps/backend/models/`.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: ML Training Pipeline' (Protocol in workflow.md)
