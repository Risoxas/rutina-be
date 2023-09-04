// controllers/ClientController.ts
import { Request, Response } from "express";
import ClientService from "../services/ClientService";

export class ClientController {
  /**
   * create a new client.
   * @param req Express request object.
   * @param res Express response object.
   * @returns Response with the created client.
   */
  static async create(req: Request, res: Response): Promise<Response> {
    const clientData = req.body;

    try {
      const client = await ClientService.createClient(clientData);
      return res.status(201).json(client);
    } catch (error) {
      console.error("Error creating client:", error);
      return res.status(500).json({ error: "Failed to create client" });
    }
  }

  /**
   * Find a client by ID.
   * @param req Express request object.
   * @param res Express response object.
   * @returns Response with the found client or error.
   */
  static async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const client = await ClientService.getClientById(id);
      if (client) {
        return res.status(200).json(client);
      } else {
        return res.status(404).json({ error: "Client not found" });
      }
    } catch (error) {
      console.error("Error finding client by ID:", error);
      return res.status(500).json({ error: "Failed to find client" });
    }
  }

  /**
   * Get all clients.
   * @param req Express request object.
   * @param res Express response object.
   * @returns Response with the list of clients or error.
   */
  static async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const clients = await ClientService.getAllClients();
      return res.status(200).json(clients);
    } catch (error) {
      console.error("Error finding all clients:", error);
      return res.status(500).json({ error: "Failed to retrieve clients" });
    }
  }

  /**
   * Search clients.
   * @param req Express request object.
   * @param res Express response object.
   * @returns Response with the list of clients or error.
   */
  static async search(req: Request, res: Response): Promise<Response> {
    const searchData = req.body;

    try {
      const clients = await ClientService.searchClients(searchData);
      return res.status(200).json(clients);
    } catch (error) {
      console.error("Error searching clients:", error);
      return res.status(500).json({ error: "Failed to search clients" });
    }
  }

  /**
   * Update a client
   * @param req
   * @param res
   * @returns updated client
   */
  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const clientData = req.body;
      const client = await ClientService.updateClient(clientData);
      return res.status(200).json(client);
    } catch (error) {
      console.error("Error updating client:", error);
      return res.status(500).json({ error: "Failed to update client" });
    }
  }

  /**
   * Delete a client
   * @param req
   * @param res
   * @returns deleted client
   */
  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body;
      const client = await ClientService.getClientById(id);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }
      await ClientService.deleteClient(id);
      return res.status(200).json(client);
    } catch (error) {
      console.error("Error deleting client:", error);
      return res.status(500).json({ error: "Failed to delete client" });
    }
  }

  /**
   * Update an exercise weight
   * @param req
   * @param res
   * @returns updated client
   */
  static async updateExerciseWeight(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { clientId, exerciseId, weight } = req.body;
      const client = await ClientService.updateExerciseWeight(
        clientId,
        exerciseId,
        weight
      );
      return res.status(200).json(client);
    } catch (error) {
      console.error("Error updating client:", error);
      return res.status(500).json({ error: "Failed to update client" });
    }
  }
}
