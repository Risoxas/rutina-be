# Rutina-be
markdown
## Rutina-be API Documentation

This repository contains the backend API for the Rutina application. Built using FastAPI, this API provides endpoints for managing user data, workout routines, and progress tracking.

**Endpoints:**

*   **/users**: User management operations (create, read, update, delete).
*   **/routines**: Workout routine management (create, read, update, delete).
*   **/progress**: Track user progress on workouts.


**Technologies Used:**

*   FastAPI
*   Python 3.11+
*   PostgreSQL (or other database as specified in the configuration)

**Setup and Installation:**

1.  Clone the repository: `git clone <repository_url>`
2.  Create a virtual environment: `python3 -m venv venv`
3.  Activate the virtual environment: `source venv/bin/activate`
4.  Install dependencies: `pip install -r requirements.txt`
5.  Configure database connection settings.
6.  Run the application: `uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload`


**Testing:**

Automated tests are located in the `tests` directory. Run the tests using: `pytest`

