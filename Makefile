SHELL := /bin/bash

.PHONY: install dev check backend frontend

install:
	cd apps/backend && uv sync
	cd apps/frontend && bun install

dev:
	(cd apps/backend && uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000) & \
	BACKEND_PID=$$!; \
	(cd apps/frontend && bun run dev); \
	kill $$BACKEND_PID

check:
	cd apps/backend && uv run ruff check .
	cd apps/backend && uv run pytest -q
	cd apps/frontend && bun run lint
	cd apps/frontend && bun run typecheck
