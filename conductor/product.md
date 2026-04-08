# Product Brief (Source Requirements)

This section captures the original build requirements that define scope and acceptance expectations for the project.

## Project Structure & Tooling

- The monorepo mixes Python and Node environments.
- Use uv workspaces for Python backend and training dependencies (`apps/backend`, `training/`).
- Use bun for the React frontend (`apps/frontend`).
- Provide a root `Makefile` with dependency installation and a `make dev` command that runs FastAPI and Vite concurrently.

## 1) Training (`training/train.ipynb`)

- **Format**: Notebook should be deliverable cell-by-cell.
- **Dataset**: CUB-200-2011 with auto download/extract (e.g., `wget` or `gdown`) if absent locally.
- **Model**: EfficientNet-B0 with ImageNet pre-trained weights; replace classifier head for 200 classes.
- **Data Prep**: Custom PyTorch DataLoader, resize to 224x224 RGB, ImageNet normalization (`mean=[0.485, 0.456, 0.406]`, `std=[0.229, 0.224, 0.225]`), and 20% validation split.
- **Artifacts**: Save `bird_model.pth` and `label_list.json` (200 species names) and move/copy them to `../apps/backend/models/`.

## 2) Backend (`apps/backend`)

- **Framework**: FastAPI with CORS configured for frontend requests.
- **Optimization**: Load `bird_model.pth` exactly once at startup via FastAPI lifespan context manager.
- **Database**: SQLite with SQLAlchemy; schema includes `id`, `filepath`, `top_species`, `probability`, `timestamp`, and `is_uncertain`.
- **Data Persistence**: Save uploaded images in `static/uploads/` and persist metadata/filepath to SQLite. Mount static files so the frontend can render saved images.
- **Endpoint `/predict`**: Accept `UploadFile`, run inference at 224x224, persist file + DB record, and return Top 5 results.
- **Uncertainty Logic**: Set `is_uncertain: true` in API response and DB when top probability is `< 0.30`.

## 3) Frontend (`apps/frontend`)

- **Stack**: React + Vite + Tailwind + Shadcn UI + TanStack Router.
- **UI/UX**: Modern dashboard with drag-and-drop `FileUploader` and image preview.
- **Text Instructions**: Show exactly: "1. Take a picture, 2. Crop image to feature the bird, 3. Upload." (no interactive crop tool required).
- **Alerts**: Show Shadcn UI warning alert when `is_uncertain` is true.
- **Results**: Display Top 5 predictions in a Shadcn DataTable or list.
- **Routing**: Separate `History` page that fetches SQLite-backed records and renders saved images as gallery/table content.

## 4) DevOps

- Include a `README.md` section describing how to connect VS Code to a Google Colab GPU runtime (VS Code Colab/Jupyter extension or SSH workflow) to run `training/train.ipynb` from local editor tooling.

## Delivery Expectations

- Provide directory tree first.
- Provide essential config files (`Makefile`, `pyproject.toml`, `package.json`).
- Provide complete backend, frontend, and notebook implementation with aligned imports, routing, and dependencies.

---

# Product Definition: Bird Recognition Monorepo

## Overview

This project aims to build a production-ready bird recognition hybrid monorepo that identifies 200 bird species from the CUB-200-2011 dataset. It leverages transfer learning with EfficientNet-B0 and provides a seamless, modern web experience for bird watchers, citizen scientists, and researchers.

## Target Audience

- **Bird Watchers**: Enthusiasts seeking to identify birds in the wild.
- **Citizen Scientists**: Individuals contributing sightings to research efforts.
- **Researchers**: Professionals requiring automated classification for large-scale data analysis.

## Key Goals

- **High Precision**: Utilize EfficientNet-B0 pre-trained on ImageNet to achieve high classification accuracy.
- **User Accessibility**: Provide an intuitive web interface built with React, Tailwind, and Shadcn UI.
- **Low Latency**: Ensure fast inference through efficient model loading and optimized FastAPI endpoints.

## Core Features

### 1. Training Pipeline

- Automated download and extraction of the CUB-200-2011 dataset.
- Transfer learning with EfficientNet-B0 using PyTorch.
- Custom DataLoader with standard ImageNet normalization and 20% validation split.
- Exportable model artifacts (`bird_model.pth` and `label_list.json`).

### 2. Backend Services (FastAPI)

- Single-instance model loading at startup via lifespan context manager.
- `/predict` endpoint for image uploads and Top 5 species inference.
- SQLite persistence for sightings metadata (species, probability, file path, uncertainty).
- Static file serving for uploaded images.

### 3. Frontend Dashboard (React + Vite)

- Drag-and-drop file uploader with image preview.
- Real-time prediction results (Top 5) and uncertainty alerts for low-confidence results (< 0.30).
- Type-safe routing via TanStack Router.
- **History Page**: A dedicated gallery and table view for past sightings.

### 4. Advanced Functionality

- **Export History**: Allow users to export sighting data.
- **User Feedback Loop**: Mechanism for users to correct or confirm predictions.

## DevOps & Tooling

- **Hybrid Monorepo**: Python (uv workspaces) and Node (bun) environments.
- **Unified Workflow**: Root Makefile for dependency management and concurrent development servers.
- **Colab Integration**: Detailed guide for connecting VS Code to remote GPU instances for training.

## FastAPI API documentation reference

Backend API docs endpoints (when running locally):

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- OpenAPI schema: `http://localhost:8000/openapi.json`
