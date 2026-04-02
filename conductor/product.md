# Initial Concept

Act as a Senior Full-Stack AI Engineer. Help me build a production-ready bird recognition hybrid monorepo.

Project Structure & Tooling:

The monorepo will mix Python and Node environments.

Use uv workspaces for the Python backend and training dependencies (apps/backend, training/).

Use bun for the React frontend (apps/frontend).

Provide a Makefile at the root directory with commands to install dependencies and a make dev command to spin up both the FastAPI backend and Vite frontend concurrently.

1. Training (training/train.ipynb):

Format: Provide the code for this file cell-by-cell so I can paste it into a Jupyter Notebook.

Dataset: CUB-200-2011. Include a cell to auto-download/extract the dataset using wget or gdown if it isn't found locally.

Model: Use EfficientNet-B0 with pre-trained ImageNet weights (Transfer Learning). Replace the classifier head for the 200 bird classes.

Data Prep: Implement a custom PyTorch DataLoader. Resize images to 224x224 RGB and apply standard ImageNet normalization (mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]). Use a 20% validation split.

Artifacts: Save the best model as bird_model.pth and label_list.json (containing the 200 species names). Provide Python code in the notebook to copy/move these artifacts directly into ../apps/backend/models/.

2. Backend (apps/backend):

Framework: FastAPI. Configure CORS to allow frontend requests.

Optimization: Load the bird_model.pth into memory exactly once at startup using FastAPI's lifespan context manager.

Database: SQLite via SQLAlchemy. Schema should track: id, filepath, top_species, probability, timestamp, and is_uncertain.

Data Persistence: When an image is uploaded, save the actual file to a local static/uploads/ directory, and save the associated metadata/filepath to SQLite. Ensure FastAPI mounts the static directory so the frontend can display the images.

Endpoint /predict: Accept an UploadFile. Run inference at 224x224, save the file/DB record, and return the Top 5 results.

Logic: Set is_uncertain: true in the response and DB if the top probability is < 0.30.

3. Frontend (apps/frontend):

Stack: React + Vite + Tailwind + Shadcn UI + TanStack Router (for modern, type-safe routing).

UI/UX: Build a modern dashboard. Feature a drag-and-drop FileUploader component with an image preview.

Text Instructions: Display the text "1. Take a picture, 2. Crop image to feature the bird, 3. Upload." (No interactive crop tool needed).

Alerts: Show a Shadcn UI Alert (warning variant) if the response flag is_uncertain is true.

Results: Display the Top 5 predictions in a Shadcn DataTable or list.

Routing: Use TanStack Router to create a separate 'History' page that fetches and displays past SQLite entries and renders their saved images in a gallery or table.

4. DevOps:

Provide a README.md section detailing how to connect VS Code directly to a Google Colab GPU instance (using the VS Code Colab/Jupyter extensions or SSH) so I can natively run the training/train.ipynb notebook from my local editor.

Output Instructions:
Please output the directory tree first. Then, provide the code for the essential configuration files (Makefile, pyproject.toml, package.json), followed by the complete code for the backend, frontend, and the notebook cells. Ensure all imports, routing setups, and dependencies line up perfectly.

---

# Product Definition: Bird recognition monorepo

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
