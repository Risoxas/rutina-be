import { Types } from "mongoose";
import { Client, IClient } from "../models/Client";
import BaseService from "./BaseService";
import ExerciseService from "./ExerciseService";

class ClientService extends BaseService<IClient> {

  constructor(){
    super(Client);
  }

  async updateExerciseWeight(
    clientId: string,
    exerciseId: string,
    weight: number
  ) {
    const client = await this.findById(clientId);
    if (!client) {
      throw new Error("Client not found");
    }
    const exercise = await ExerciseService.findById(exerciseId);
    if (!exercise) {
      throw new Error("Exercise not found");
    }

    const id = new Types.ObjectId(exerciseId);
    client.weightsHistory.push({
      exerciseId: id,
      weight,
      date: new Date(),
    });
    await client.save();
    return client;
  }
}

export default new ClientService();
