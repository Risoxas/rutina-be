import { Types } from "mongoose";
import ClientRepository from "../repositories/ClientRepository";
import ExerciseRepository from "../repositories/ExerciseRepository";

class ClientService {
  async createClient(clientData: any) {
    return await ClientRepository.create(clientData);
  }

  async getClientById(clientId: string) {
    return await ClientRepository.findById(clientId);
  }

  async getAllClients() {
    return await ClientRepository.findAll();
  }

  async searchClients(searchData: any) {
    return await ClientRepository.findAll(searchData);
  }

  async updateClient(updateData: any) {
    return await ClientRepository.update(updateData);
  }

  async deleteClient(clientId: string) {
    return await ClientRepository.delete(clientId);
  }

  async updateExerciseWeight(
    clientId: string,
    exerciseId: string,
    weight: number
  ) {
    const client = await ClientRepository.findById(clientId);
    if (!client) {
      throw new Error("Client not found");
    }
    const exercise = await ExerciseRepository.findById(exerciseId);
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
