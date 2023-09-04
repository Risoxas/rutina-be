import { Exercise, IExercise } from "../models/Exercise";
import BaseService from "./BaseService";

class ExerciseService extends BaseService<IExercise>{
  constructor(){
    super(Exercise);
  }
}

export default new ExerciseService();