from datetime import datetime
from urllib.parse import urlparse

from pydantic import BaseModel, Field, field_validator

from src.models.rutina import Role


class TraineeCreate(BaseModel):
    email: str = Field(min_length=5, max_length=255)
    name: str = Field(min_length=1, max_length=120)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        cleaned = value.strip().lower()
        if "@" not in cleaned or "." not in cleaned.split("@")[-1]:
            raise ValueError("Must be a valid email address.")
        return cleaned


class UserRead(BaseModel):
    id: int
    email: str
    name: str | None
    role: Role
    trainer_id: int | None = None


class ExerciseCreate(BaseModel):
    name: str = Field(min_length=1, max_length=150)
    description: str | None = None
    video_url: str | None = Field(default=None, max_length=500)

    @field_validator("video_url")
    @classmethod
    def validate_video_url(cls, value: str | None) -> str | None:
        if value is None or value.strip() == "":
            return None
        cleaned = value.strip()
        parsed = urlparse(cleaned)
        if parsed.scheme not in {"http", "https"} or not parsed.netloc:
            raise ValueError("video_url must be a valid http:// or https:// URL.")
        return cleaned


class ExerciseRead(BaseModel):
    id: int
    name: str
    description: str | None = None
    video_url: str | None = None


class RoutineExerciseInput(BaseModel):
    exercise_id: int
    sets: int = Field(ge=1, le=50)
    reps: int = Field(ge=1, le=500)
    order: int = Field(default=0, ge=0)


class RoutineCreate(BaseModel):
    name: str = Field(min_length=1, max_length=150)
    description: str | None = None
    trainee_id: int
    exercises: list[RoutineExerciseInput] = Field(default_factory=list)


class RoutineExerciseRead(BaseModel):
    exercise_id: int
    exercise_name: str
    video_url: str | None = None
    sets: int
    reps: int
    order: int


class RoutineRead(BaseModel):
    id: int
    name: str
    description: str | None = None
    trainee_id: int
    exercises: list[RoutineExerciseRead] = Field(default_factory=list)


class WorkoutExerciseLogInput(BaseModel):
    exercise_id: int
    set_number: int = Field(ge=1)
    reps: int = Field(ge=1)
    weight: float = Field(ge=0.0)


class WorkoutLogCreate(BaseModel):
    trainee_id: int
    routine_id: int | None = None
    exercises: list[WorkoutExerciseLogInput] = Field(min_length=1)


class WorkoutLogRead(BaseModel):
    id: int
    trainee_id: int
    routine_id: int | None = None
    logged_at: datetime
    exercises: list[WorkoutExerciseLogInput]
