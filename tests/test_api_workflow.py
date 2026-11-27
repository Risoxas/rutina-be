from fastapi.testclient import TestClient

from src.main import app

client = TestClient(app)


def test_trainer_trainee_routine_and_workout_flow() -> None:
    # 1. Trainer (id=1) adds a trainee
    trainee_res = client.post(
        "/api/v1/trainers/1/trainees",
        json={"email": "trainee1@rutina.app", "name": "Luis"},
    )
    assert trainee_res.status_code == 201
    trainee = trainee_res.json()
    assert trainee["trainer_id"] == 1

    # 2. Trainer lists their trainees
    list_res = client.get("/api/v1/trainers/1/trainees")
    assert list_res.status_code == 200
    assert len(list_res.json()) == 1

    # 3. Trainer creates an exercise with a video URL
    ex_res = client.post(
        "/api/v1/exercises",
        json={
            "name": "Romanian Deadlift",
            "description": "Keep back neutral",
            "video_url": "https://www.youtube.com/watch?v=2SHsk9AzdjA",
        },
    )
    assert ex_res.status_code == 201
    exercise = ex_res.json()

    # 4. Trainer creates a routine for the trainee
    routine_res = client.post(
        "/api/v1/routines",
        json={
            "name": "Lower Body A",
            "description": "Strength focus",
            "trainee_id": trainee["id"],
            "exercises": [{"exercise_id": exercise["id"], "sets": 4, "reps": 8, "order": 1}],
        },
    )
    assert routine_res.status_code == 201
    routine = routine_res.json()
    assert routine["exercises"][0]["video_url"] == exercise["video_url"]

    # 5. Trainee fetches assigned routines and logs a workout
    trainee_routines = client.get(f"/api/v1/trainees/{trainee['id']}/routines")
    assert trainee_routines.status_code == 200
    assert len(trainee_routines.json()) == 1

    log_res = client.post(
        "/api/v1/workout-logs",
        json={
            "trainee_id": trainee["id"],
            "routine_id": routine["id"],
            "exercises": [
                {"exercise_id": exercise["id"], "set_number": 1, "reps": 8, "weight": 80.0}
            ],
        },
    )
    assert log_res.status_code == 201

    logs_list = client.get(f"/api/v1/trainees/{trainee['id']}/workout-logs")
    assert logs_list.status_code == 200
    assert len(logs_list.json()) == 1


def test_body_composition_tracking() -> None:
    trainee_res = client.post(
        "/api/v1/trainers/1/trainees",
        json={"email": "bodycomp@rutina.app", "name": "Marco"},
    )
    assert trainee_res.status_code == 201
    trainee_id = trainee_res.json()["id"]

    bad_res = client.post(
        "/api/v1/body-compositions",
        json={"trainee_id": trainee_id, "weight": -5.0},
    )
    assert bad_res.status_code == 422

    comp_res = client.post(
        "/api/v1/body-compositions",
        json={"trainee_id": trainee_id, "weight": 76.4, "body_fat": 16.5, "muscle_mass": 36.2},
    )
    assert comp_res.status_code == 201
    assert comp_res.json()["weight"] == 76.4

    list_res = client.get(f"/api/v1/trainees/{trainee_id}/body-compositions")
    assert list_res.status_code == 200
    assert len(list_res.json()) == 1
