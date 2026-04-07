# Implementation Plan - Phase 3: Backend API (FastAPI)

## Phase 3: Backend API (FastAPI)
- [ ] Task: Backend Service Setup
    - [ ] Implement the FastAPI service with CORS restricted to the frontend (http://localhost:5173).
    - [ ] Implement the lifespan context manager for model artifact loading (`bird_model.pth`, `label_list.json`).
    - [ ] Implement the SQLite database schema via SQLAlchemy.
- [ ] Task: Inference & Image Persistence
    - [ ] Implement the `POST /predict` endpoint with model inference and Top 5 probabilities.
    - [ ] Implement uncertainty logic (`is_uncertain: true` if top prob < 0.30).
    - [ ] Implement file upload persistence to `static/uploads/` and record saving.
    - [ ] Implement the `GET /history` endpoint and the custom image streaming endpoint.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Backend API (FastAPI)' (Protocol in workflow.md)
