"""Main FastAPI application."""

from fastapi import FastAPI

from src.controllers.routines import router as routines_router

app = FastAPI(title="Rutina API", version="0.1.0")
app.include_router(routines_router)


@app.get("/")
async def health() -> dict[str, str]:
    """Health Check."""
    return {"message": "Ok"}
