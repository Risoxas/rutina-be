# AGENTS.md — AI Coding Harness for Rutina Backend (`rutina-be`)

## Overview
FastAPI + SQLAlchemy 2.0 + Alembic backend service for the Rutina exercise routines organizer.

## Tech Stack & Tooling
- **Language / Runtime**: Python 3.12+
- **Package Manager**: `uv` (never use bare `pip` in CI or local dev)
- **Framework**: FastAPI + Pydantic v2 + SQLAlchemy 2.0 + Alembic
- **Testing & Linting**: `pytest` + `httpx` + `ruff`

## Commands
```bash
uv sync --locked
uv run ruff check .
uv run pytest -v
uv run uvicorn src.main:app --reload
```

## Security & Hygiene Rules
1. **Never commit secrets**: `.env`, database credentials, or JWT secrets must come from environment variables (`os.environ`).
2. **Database migrations**: Always generate Alembic migrations for schema changes (`uv run alembic revision --autogenerate -m "..."`).
3. **Layered architecture**: Keep route handlers in `src/controllers/`, business logic in `src/services/`, DB access in `src/repositories/`, and Pydantic schemas in `src/schemas/`.

## Git Flow Workflow
- `main`: Production-ready releases.
- `develop`: Integration branch for completed features.
- `feature/<slug>`: Branched from `develop`, verified with `uv run ruff check .` and `uv run pytest -v`, then merged (`--no-ff`).
