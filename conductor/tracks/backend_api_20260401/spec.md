# Specification: Phase 3: Backend API (FastAPI)

## Overview

This track focuses on developing the FastAPI backend to serve bird recognition model predictions, manage sighting history, and persist data using SQLite and SQLAlchemy.

## Functional Requirements

- **FastAPI Framework**:
  - Restricted CORS to allow requests only from the frontend (http://localhost:5173).
  - Lifespan context manager to load the ML model artifacts once at startup.
- **Database (SQLite + SQLAlchemy)**:
  - Schema: `id`, `filepath`, `top_species`, `probability`, `timestamp`, `is_uncertain`.
- **API Endpoints**:
  - `POST /predict`:
    - Accept image upload (`UploadFile`).
    - Perform inference (224x224) and return Top 5 species with probabilities.
    - Persist image to `static/uploads/` and sighting data to SQLite.
    - Flag `is_uncertain: true` if the top prediction probability is < 0.30.
  - `GET /history`:
    - Retrieve all sighting records from the database.
- **Static File Serving**:
  - Mount static files for uploaded bird images (`static/uploads/`) so the frontend can render saved images.
  - Optional: add a dedicated streaming endpoint if additional access control or processing is required.

## Non-Functional Requirements

- **Performance**: Inference latency target of < 500ms.
- **Scalability**: Efficient model loading and database interactions.

## Acceptance Criteria

- [ ] `POST /predict` returns correct species classification and saves data accurately.
- [ ] `GET /history` correctly retrieves all historical sighting records.
- [ ] Model is loaded efficiently using the lifespan manager.
- [ ] CORS and image streaming work correctly with the frontend.

## Out of Scope

- Implementation of the frontend dashboard or history gallery (Phase 4).
- Implementation of the machine learning training pipeline (Phase 2).
