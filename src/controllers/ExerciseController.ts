import { Request, Response } from "express";
import ExerciseService from "../services/ExerciseService";

export class ExerciseController {
  /**
   * Create a new exercise.
   * @param req Express request object.
   * @param res Express response object.
   * @returns Response with the created exercise.
   */
  static async create(req: Request, res: Response): Promise<Response> {
    const exerciseData = req.body;

    try {
      const exercise = await ExerciseService.createExercise(exerciseData);
      return res.status(201).json(exercise);
    } catch (error) {
      console.error("Error creating exercise:", error);
      return res.status(500).json({ error: "Failed to create exercise" });
    }
  }

  /**
   * Find a exercise by ID.
   * @param req Express request object.
   * @param res Express response object.
   * @returns Response with the found exercise or error.
   */
  static async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const exercise = await ExerciseService.findExerciseById(id);
      if (exercise) {
        return res.status(200).json(exercise);
      } else {
        return res.status(404).json({ error: "Exercise not found" });
      }
    } catch (error) {
      console.error("Error finding exercise by ID:", error);
      return res.status(500).json({ error: "Failed to find exercise" });
    }
  }

  /**
   * Get all exercises.
   * @param req Express request object.
   * @param res Express response object.
   * @returns Response with the list of exercises or error.
   */
  static async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const exercises = await ExerciseService.findAllExercises();
      return res.status(200).json(exercises);
    } catch (error) {
      console.error("Error finding all exercises:", error);
      return res.status(500).json({ error: "Failed to retrieve exercises" });
    }
  }

  /**
   * Update an exercise
   * @param req
   * @param res
   * @returns updated exercise
   */
  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const exerciseData = req.body;
      const exercise = await ExerciseService.updateExercise(exerciseData);
      return res.status(200).json(exercise);
    } catch (error) {
      console.error("Error updating exercise:", error);
      return res.status(500).json({ error: "Failed to update exercise" });
    }
  }

  /**
   * Delete an exercise
   * @param req
   * @param res
   * @returns deleted exercise
   */
  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body;
      const exercise = await ExerciseService.findExerciseById(id);
      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      const deletedExercise = await ExerciseService.deleteExercise(id);
      return res.status(200).json(deletedExercise);
    } catch (error) {
      console.error("Error deleting exercise:", error);
      return res.status(500).json({ error: "Failed to delete exercise" });
    }
  }

  static async search(req: Request, res: Response): Promise<Response> {
    try {
      const conditions = req.params;
      const exercises = await ExerciseService.searchExercises(conditions);
      return res.status(200).json(exercises);
    } catch (error) {
      console.error("Error finding all exercises:", error);
      return res.status(500).json({ error: "Failed to retrieve exercises" });
    }
  }
}
