# Specification: Phase 1: Project Scaffolding & DevOps

## Overview
This track focuses on building the foundational monorepo structure, setting up unified development tools, and providing clear instructions for Google Colab integration.

## Functional Requirements
- **Root Makefile**:
    - `make install`: Install both Python (uv) and Node.js (bun) dependencies.
    - `make dev`: Concurrently start the FastAPI backend and Vite frontend.
    - `make check`: Run tests and linters for the entire project.
- **Monorepo Layout**:
    - `apps/backend/`: Directory for the FastAPI backend.
    - `apps/frontend/`: Directory for the React + Vite frontend.
    - `training/`: Directory for Jupyter Notebook training scripts and data.
- **Documentation**:
    - `README.md`: Comprehensive setup guide, including VS Code + Google Colab extension integration.

## Non-Functional Requirements
- **Standard Environment**: Python 3.10+ (uv) and Node.js (bun).
- **Developer Experience**: Unified, seamless development workflow across the hybrid environment.

## Acceptance Criteria
- [ ] Root `Makefile` exists with `install`, `dev`, and `check` commands.
- [ ] `apps/backend/`, `apps/frontend/`, and `training/` directories are created and initialized.
- [ ] `README.md` includes clear instructions for VS Code + Colab integration.
- [ ] All initial configuration files (`pyproject.toml`, `package.json`, etc.) are correctly placed.

## Out of Scope
- Implementation of the machine learning model or training scripts (Phase 2).
- Implementation of specific backend endpoints or database logic (Phase 3).
- Implementation of frontend components or routing (Phase 4).
