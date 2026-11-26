from datetime import UTC, datetime

from src.models.rutina import Role
from src.schemas.rutina import (
    ExerciseCreate,
    ExerciseRead,
    RoutineCreate,
    RoutineExerciseRead,
    RoutineRead,
    TraineeCreate,
    UserRead,
    WorkoutLogCreate,
    WorkoutLogRead,
)


class RutinaStore:
    """In-memory service store for trainer/trainee routines and workout tracking."""

    def __init__(self) -> None:
        self._users: dict[int, UserRead] = {
            1: UserRead(id=1, email="trainer@rutina.app", name="Coach David", role=Role.TRAINER)
        }
        self._exercises: dict[int, ExerciseRead] = {}
        self._routines: dict[int, RoutineRead] = {}
        self._workout_logs: dict[int, WorkoutLogRead] = {}
        self._next_user_id = 2
        self._next_exercise_id = 1
        self._next_routine_id = 1
        self._next_log_id = 1

    def add_trainee(self, trainer_id: int, payload: TraineeCreate) -> UserRead:
        trainer = self._users.get(trainer_id)
        if not trainer or trainer.role != Role.TRAINER:
            raise LookupError("Trainer not found.")
        if any(u.email == payload.email for u in self._users.values()):
            raise ValueError("A user with this email already exists.")

        user = UserRead(
            id=self._next_user_id,
            email=payload.email,
            name=payload.name,
            role=Role.TRAINEE,
            trainer_id=trainer_id,
        )
        self._users[user.id] = user
        self._next_user_id += 1
        return user

    def list_trainees(self, trainer_id: int) -> list[UserRead]:
        trainer = self._users.get(trainer_id)
        if not trainer or trainer.role != Role.TRAINER:
            raise LookupError("Trainer not found.")
        return [u for u in self._users.values() if u.trainer_id == trainer_id]

    def create_exercise(self, payload: ExerciseCreate) -> ExerciseRead:
        exercise = ExerciseRead(
            id=self._next_exercise_id,
            name=payload.name,
            description=payload.description,
            video_url=payload.video_url,
        )
        self._exercises[exercise.id] = exercise
        self._next_exercise_id += 1
        return exercise

    def list_exercises(self) -> list[ExerciseRead]:
        return list(self._exercises.values())

    def create_routine(self, payload: RoutineCreate) -> RoutineRead:
        trainee = self._users.get(payload.trainee_id)
        if not trainee:
            raise LookupError("Trainee not found.")

        items: list[RoutineExerciseRead] = []
        for entry in sorted(payload.exercises, key=lambda item: item.order):
            exercise = self._exercises.get(entry.exercise_id)
            if not exercise:
                raise LookupError(f"Exercise {entry.exercise_id} not found.")
            items.append(
                RoutineExerciseRead(
                    exercise_id=exercise.id,
                    exercise_name=exercise.name,
                    video_url=exercise.video_url,
                    sets=entry.sets,
                    reps=entry.reps,
                    order=entry.order,
                )
            )

        routine = RoutineRead(
            id=self._next_routine_id,
            name=payload.name,
            description=payload.description,
            trainee_id=payload.trainee_id,
            exercises=items,
        )
        self._routines[routine.id] = routine
        self._next_routine_id += 1
        return routine

    def list_trainee_routines(self, trainee_id: int) -> list[RoutineRead]:
        if trainee_id not in self._users:
            raise LookupError("Trainee not found.")
        return [r for r in self._routines.values() if r.trainee_id == trainee_id]

    def log_workout(self, payload: WorkoutLogCreate) -> WorkoutLogRead:
        if payload.trainee_id not in self._users:
            raise LookupError("Trainee not found.")
        if payload.routine_id is not None and payload.routine_id not in self._routines:
            raise LookupError("Routine not found.")
        for entry in payload.exercises:
            if entry.exercise_id not in self._exercises:
                raise LookupError(f"Exercise {entry.exercise_id} not found.")

        log = WorkoutLogRead(
            id=self._next_log_id,
            trainee_id=payload.trainee_id,
            routine_id=payload.routine_id,
            logged_at=datetime.now(UTC),
            exercises=payload.exercises,
        )
        self._workout_logs[log.id] = log
        self._next_log_id += 1
        return log

    def list_trainee_logs(self, trainee_id: int) -> list[WorkoutLogRead]:
        if trainee_id not in self._users:
            raise LookupError("Trainee not found.")
        return [log for log in self._workout_logs.values() if log.trainee_id == trainee_id]


store = RutinaStore()
