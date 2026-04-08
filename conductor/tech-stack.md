# Tech Stack: Bird recognition monorepo

## Languages
- **Python**: Core language for model training (PyTorch), backend development (FastAPI), and data analysis.
- **TypeScript**: Used for building a robust, type-safe React frontend.
- **Shell (Makefile)**: Used for unified project management and automation.

## Backend & Machine Learning
- **FastAPI**: High-performance Python web framework for serving inference results.
- **uv**: Modern Python tool for workspace management, dependency isolation, and script execution.
- **PyTorch**: Deep learning library for training the EfficientNet-B0 model and running inference.
- **EfficientNet-B0**: Pre-trained model architecture optimized for high accuracy with minimal parameters.

## Frontend & Tooling
- **React + Vite + Tailwind CSS**: Modern, performant frontend stack for building the dashboard.
- **Shadcn UI**: Highly customizable component library built on Radix UI and Tailwind.
- **TanStack Router**: Type-safe routing for managing navigation and history state.
- **bun**: Fast Node.js runtime, package manager, and bundler.

## Data & Persistence
- **SQLite**: Lightweight, serverless relational database for storing sighting metadata.
- **SQLAlchemy**: Python SQL toolkit and ORM for managing SQLite interactions.
- **Static File Storage**: Local filesystem directory for persisting uploaded bird images.

## Development & Training
- **Jupyter Notebooks**: Environment for training and experimentation (`training/train.ipynb`).
- **Google Colab Integration**: Remote GPU access via VS Code for efficient model training.

## FastAPI API documentation reference

FastAPI automatically serves the backend contract for local development:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- OpenAPI schema: `http://localhost:8000/openapi.json`
