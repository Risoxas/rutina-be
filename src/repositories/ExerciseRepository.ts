import { Exercise, IExercise } from "../models/Exercise";
import BaseRepository from "./BaseRepository";


class ExerciseRepository extends BaseRepository<IExercise>{
  async create(data: Partial<IExercise>): Promise<IExercise> {
    return await this.model.create(data);
  }
}

export default new ExerciseRepository(Exercise);