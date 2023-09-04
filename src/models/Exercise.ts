import { Document, Schema, model } from "mongoose";

export interface IExercise extends Document {
  name: string;
  videoUrl: string;
  update: Boolean;
}

const ExerciseSchema = new Schema({
  name: {type: String, required: true},
  videoUrl: {type: String, required: true},
  update: {type: Boolean, default: false}
})

export const Exercise = model<IExercise>("Exercise", ExerciseSchema);