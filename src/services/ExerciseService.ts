import ExerciseRepository from "../repositories/ExerciseRepository";

class ExerciseService {
  async createExercise(data: any){
    return await ExerciseRepository.create(data);
  }

  async findExerciseById(id: string){
    return await ExerciseRepository.findById(id);
  }
  async findAllExercises(){
    return await ExerciseRepository.findAll();
  }
  async searchExercises(conditions: any){
    return await ExerciseRepository.findAll(conditions);
  }
  async updateExercise(data: any){
    return await ExerciseRepository.update(data);
  }
  async deleteExercise(id: string){
    return await ExerciseRepository.delete(id);
  }
}

export default new ExerciseService();