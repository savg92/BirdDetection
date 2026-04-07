# Specification: Phase 4: Frontend Dashboard (React + Vite)

## Overview
This track focuses on developing the modern React frontend dashboard using Vite, Tailwind CSS, Shadcn UI, and TanStack Router to provide a seamless user experience for bird identification.

## Functional Requirements
- **Core Frontend Stack**:
    - React + Vite for development and bundling.
    - Tailwind CSS and Shadcn UI for modern, responsive components.
    - TanStack Router for type-safe routing.
- **Dashboard Page**:
    - **File Uploader**: Drag-and-drop zone with image preview and text instructions ("1. Take a picture, 2. Crop image, 3. Upload").
    - **Results View**: Top 5 species predictions displayed in a Shadcn UI DataTable.
    - **Uncertainty Alert**: Shadcn UI Alert (warning variant) displayed if the prediction is marked as uncertain.
- **History Page**:
    - **Gallery/Table View**: Hybrid display of past sightings fetched from the backend `/history` endpoint.
    - **Image Rendering**: Display bird images using the backend's streaming endpoint.

## Non-Functional Requirements
- **Mobile-First Design**: Fully responsive layout for bird watchers on the go.
- **Visual Aesthetic**: Polished, modern, and high-contrast "Avian-AI" branding.

## Acceptance Criteria
- [ ] Dashboard correctly handles image uploads and displays Top 5 results.
- [ ] History page successfully fetches and renders past sightings and images.
- [ ] TanStack Router manages navigation between Dashboard and History seamlessly.
- [ ] Uncertainty alerts and results tables are rendered accurately according to the backend response.

## Out of Scope
- Implementation of the FastAPI backend or inference endpoints (Phase 3).
- Implementation of the machine learning training pipeline (Phase 2).
