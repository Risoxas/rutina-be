from fastapi import APIRouter, HTTPException, status

from src.schemas.rutina import (
    BodyCompositionCreate,
    BodyCompositionRead,
    ExerciseCreate,
    ExerciseRead,
    RoutineCreate,
    RoutineRead,
    TraineeCreate,
    UserRead,
    WorkoutLogCreate,
    WorkoutLogRead,
)
from src.services.rutina_service import store

router = APIRouter(prefix="/api/v1", tags=["rutina"])


@router.post(
    "/trainers/{trainer_id}/trainees",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED,
)
def add_trainee(trainer_id: int, payload: TraineeCreate) -> UserRead:
    try:
        return store.add_trainee(trainer_id, payload)
    except LookupError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(exc)) from exc


@router.get("/trainers/{trainer_id}/trainees", response_model=list[UserRead])
def list_trainees(trainer_id: int) -> list[UserRead]:
    try:
        return store.list_trainees(trainer_id)
    except LookupError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc


@router.post("/exercises", response_model=ExerciseRead, status_code=status.HTTP_201_CREATED)
def create_exercise(payload: ExerciseCreate) -> ExerciseRead:
    return store.create_exercise(payload)


@router.get("/exercises", response_model=list[ExerciseRead])
def list_exercises() -> list[ExerciseRead]:
    return store.list_exercises()


@router.post("/routines", response_model=RoutineRead, status_code=status.HTTP_201_CREATED)
def create_routine(payload: RoutineCreate) -> RoutineRead:
    try:
        return store.create_routine(payload)
    except LookupError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc


@router.get("/trainees/{trainee_id}/routines", response_model=list[RoutineRead])
def list_trainee_routines(trainee_id: int) -> list[RoutineRead]:
    try:
        return store.list_trainee_routines(trainee_id)
    except LookupError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc


@router.post("/workout-logs", response_model=WorkoutLogRead, status_code=status.HTTP_201_CREATED)
def log_workout(payload: WorkoutLogCreate) -> WorkoutLogRead:
    try:
        return store.log_workout(payload)
    except LookupError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc


@router.get("/trainees/{trainee_id}/workout-logs", response_model=list[WorkoutLogRead])
def list_trainee_logs(trainee_id: int) -> list[WorkoutLogRead]:
    try:
        return store.list_trainee_logs(trainee_id)
    except LookupError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc


@router.post(
    "/body-compositions",
    response_model=BodyCompositionRead,
    status_code=status.HTTP_201_CREATED,
)
def record_body_composition(payload: BodyCompositionCreate) -> BodyCompositionRead:
    try:
        return store.record_body_composition(payload)
    except LookupError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc


@router.get("/trainees/{trainee_id}/body-compositions", response_model=list[BodyCompositionRead])
def list_body_compositions(trainee_id: int) -> list[BodyCompositionRead]:
    try:
        return store.list_body_compositions(trainee_id)
    except LookupError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc
