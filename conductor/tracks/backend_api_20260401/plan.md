# Implementation Plan - Phase 3: Backend API (FastAPI)

## Phase 3: Backend API (FastAPI)

- [x] Task: Backend Service Setup
  - [x] Implement the FastAPI service with CORS restricted to the frontend (http://localhost:5173).
  - [x] Implement the lifespan context manager for model artifact loading (`bird_model.pth`, `label_list.json`).
  - [x] Implement the SQLite database schema via SQLAlchemy.
- [x] Task: Inference & Image Persistence
  - [x] Implement the `POST /predict` endpoint with model inference and Top 5 probabilities.
  - [x] Implement uncertainty logic (`is_uncertain: true` if top prob < 0.30).
  - [x] Implement file upload persistence to `static/uploads/` and record saving.
  - [x] Implement the `GET /history` endpoint and the custom image streaming endpoint.
- [~] Task: Conductor - User Manual Verification 'Phase 3: Backend API (FastAPI)' (Protocol in workflow.md)
