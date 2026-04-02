# Implementation Plan - bird_recognition_20260401

## Phase 1: Project Scaffolding & DevOps
- [ ] Task: Root Project Configuration
    - [ ] Create a root `Makefile` for unified project management.
    - [ ] Initialize `uv` workspace for the Python backend and training dependencies.
    - [ ] Initialize `bun` for the React frontend.
- [ ] Task: Project Directory Structure
    - [ ] Create `apps/backend/`, `apps/frontend/`, and `training/` directories.
    - [ ] Create essential configuration files (`pyproject.toml`, `package.json`, etc.).
- [ ] Task: README & Colab Integration
    - [ ] Draft a comprehensive `README.md` with setup and Colab instructions.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Project Scaffolding & DevOps' (Protocol in workflow.md)

## Phase 2: ML Training Pipeline
- [ ] Task: Dataset & Preprocessing
    - [ ] Create `training/train.ipynb` with CUB-200-2011 download and extraction.
    - [ ] Implement a custom PyTorch DataLoader with 224x224 RGB normalization and 20% validation split.
- [ ] Task: Model Training & Artifact Export
    - [ ] Implement EfficientNet-B0 transfer learning (200 bird classes).
    - [ ] Implement model training and artifact export (`bird_model.pth`, `label_list.json`).
- [ ] Task: Conductor - User Manual Verification 'Phase 2: ML Training Pipeline' (Protocol in workflow.md)

## Phase 3: Backend API (FastAPI)
- [ ] Task: Backend Service Setup
    - [ ] Implement the FastAPI service with CORS and lifespan model loading.
    - [ ] Implement SQLAlchemy/SQLite schema for sighting history.
- [ ] Task: Inference & Image Persistence
    - [ ] Implement the `/predict` endpoint with model inference and uncertainty logic.
    - [ ] Implement file upload persistence and static directory mounting.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Backend API (FastAPI)' (Protocol in workflow.md)

## Phase 4: Frontend Dashboard (React + Vite)
- [ ] Task: Frontend Scaffolding
    - [ ] Set up Vite, React, Tailwind CSS, and Shadcn UI.
    - [ ] Configure TanStack Router for type-safe navigation.
- [ ] Task: Dashboard UI & Upload Logic
    - [ ] Build the Dashboard page with the drag-and-drop FileUploader and image preview.
    - [ ] Build the Results display and uncertainty alerts.
- [ ] Task: Sighting History Gallery
    - [ ] Build the History page for displaying past sighting records and images.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Frontend Dashboard (React + Vite)' (Protocol in workflow.md)

## Phase 5: Integration & Final Polish
- [ ] Task: End-to-End Integration
    - [ ] Verify the full flow from training to inference and frontend display.
    - [ ] Polish UI/UX and fix any remaining bugs.
- [ ] Task: Conductor - User Manual Verification 'Phase 5: Integration & Final Polish' (Protocol in workflow.md)
