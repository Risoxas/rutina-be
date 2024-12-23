"""Main FastAPI application."""
from fastapi import FastAPI

app = FastAPI()

@app.get('/')
async def health():
    """ Health Check """
    return {"message": "Ok"}
