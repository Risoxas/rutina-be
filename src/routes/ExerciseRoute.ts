import { Router } from "express";
import { ExerciseController } from "../controllers/ExerciseController";

const router: Router = Router();

router.get("/", ExerciseController.findAll);
router.post("/new", ExerciseController.create);
router.get("/:id", ExerciseController.findById);
router.get("/search", ExerciseController.search);
router.patch("/update", ExerciseController.update);
router.delete("/:id", ExerciseController.delete);

export default router;
