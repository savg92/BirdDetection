# Track bird_recognition_20260401: Build core bird recognition hybrid monorepo (FastAPI + React)

## Specification
This track aims to build a production-ready bird recognition hybrid monorepo that identifies 200 bird species from the CUB-200-2011 dataset. It leverages transfer learning with EfficientNet-B0 and provides a seamless, modern web experience for bird watchers, citizen scientists, and researchers.

## Core Features
1. **Training Pipeline (ML)**: Automated CUB-200-2011 dataset download, EfficientNet-B0 training (PyTorch), and artifact export.
2. **Backend API (FastAPI)**: Model loading at startup, SQLite persistence for sighting records, and image upload inference.
3. **Frontend Dashboard (React + Vite)**: Modern UI with drag-and-drop file uploader, real-time results, and a sighting history gallery.
4. **DevOps**: Unified Makefile for environment management and local VS Code Colab integration.

## Technical Details
- **Stack**: Python (uv), Node (bun), React, Vite, FastAPI, PyTorch, SQLite.
- **Model**: EfficientNet-B0 pre-trained on ImageNet.
- **Input**: 224x224 RGB normalized images.
- **Uncertainty**: Alert if top probability < 0.30.

## FastAPI API documentation reference

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- OpenAPI schema: `http://localhost:8000/openapi.json`
