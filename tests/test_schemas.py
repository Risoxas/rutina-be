import pytest
from pydantic import ValidationError

from src.models.rutina import Role
from src.schemas.rutina import ExerciseCreate, RoutineExerciseInput, TraineeCreate


def test_exercise_create_validates_video_url() -> None:
    valid = ExerciseCreate(
        name="Barbell Squat",
        video_url="https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    )
    assert valid.video_url == "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

    empty = ExerciseCreate(name="Push Up", video_url="   ")
    assert empty.video_url is None

    with pytest.raises(ValidationError, match="http:// or https://"):
        ExerciseCreate(name="Bad Video", video_url="javascript:alert(1)")


def test_trainee_create_normalizes_email() -> None:
    trainee = TraineeCreate(email="  Alex@Example.COM ", name="Alex")
    assert trainee.email == "alex@example.com"


def test_routine_exercise_bounds() -> None:
    item = RoutineExerciseInput(exercise_id=1, sets=4, reps=10, order=1)
    assert item.sets == 4
    assert Role.TRAINER == "TRAINER"

    with pytest.raises(ValidationError):
        RoutineExerciseInput(exercise_id=1, sets=0, reps=10)
