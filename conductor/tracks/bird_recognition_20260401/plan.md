# Implementation Plan - bird_recognition_20260401

## Phase 1: Project Scaffolding & DevOps

- [x] Task: Root Project Configuration
  - [x] Create a root `Makefile` for unified project management.
  - [x] Initialize `uv` workspace for the Python backend and training dependencies.
  - [x] Initialize `bun` for the React frontend.
- [x] Task: Project Directory Structure
  - [x] Create `apps/backend/`, `apps/frontend/`, and `training/` directories.
  - [x] Create essential configuration files (`pyproject.toml`, `package.json`, etc.).
- [x] Task: README & Colab Integration
  - [x] Draft a comprehensive `README.md` with setup and Colab instructions.
- [~] Task: Conductor - User Manual Verification 'Phase 1: Project Scaffolding & DevOps' (Protocol in workflow.md)

## Phase 2: ML Training Pipeline

- [x] Task: Dataset & Preprocessing
  - [x] Create `training/train.ipynb` with CUB-200-2011 download and extraction.
  - [x] Implement a custom PyTorch DataLoader with 224x224 RGB normalization and 20% validation split.
- [x] Task: Model Training & Artifact Export
  - [x] Implement EfficientNet-B0 transfer learning (200 bird classes).
  - [x] Implement model training and artifact export (`bird_model.pth`, `label_list.json`).
- [~] Task: Conductor - User Manual Verification 'Phase 2: ML Training Pipeline' (Protocol in workflow.md)

## Phase 3: Backend API (FastAPI)

- [x] Task: Backend Service Setup
  - [x] Implement the FastAPI service with CORS and lifespan model loading.
  - [x] Implement SQLAlchemy/SQLite schema for sighting history.
- [x] Task: Inference & Image Persistence
  - [x] Implement the `/predict` endpoint with model inference and uncertainty logic.
  - [x] Implement file upload persistence and static directory mounting.
- [~] Task: Conductor - User Manual Verification 'Phase 3: Backend API (FastAPI)' (Protocol in workflow.md)

## Phase 4: Frontend Dashboard (React + Vite)

- [x] Task: Frontend Scaffolding
  - [x] Set up Vite, React, Tailwind CSS, and Shadcn UI.
  - [x] Configure TanStack Router for type-safe navigation.
- [x] Task: Dashboard UI & Upload Logic
  - [x] Build the Dashboard page with the drag-and-drop FileUploader and image preview.
  - [x] Build the Results display and uncertainty alerts.
- [x] Task: Sighting History Gallery
  - [x] Build the History page for displaying past sighting records and images.
- [~] Task: Conductor - User Manual Verification 'Phase 4: Frontend Dashboard (React + Vite)' (Protocol in workflow.md)

## Phase 5: Integration & Final Polish

- [x] Task: End-to-End Integration
  - [x] Verify the full flow from training to inference and frontend display.
  - [x] Polish UI/UX and fix any remaining bugs.
- [~] Task: Conductor - User Manual Verification 'Phase 5: Integration & Final Polish' (Protocol in workflow.md)
