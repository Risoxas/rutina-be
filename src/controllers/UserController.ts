import express from "express";
import UserService from "../services/UserService";

export class UserController {
  static async signUp(req: express.Request, res: express.Response) {
    try {
      const { email, password, clientId } = req.body;
      const data = await UserService.signUp(email, password, clientId);
      res.json(data);
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    }
  }

  static async signIn(req: express.Request, res: express.Response) {
    try {
      const { email, password } = req.body;
      const data = await UserService.signIn(email, password);
      res.json(data);
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    }
  }

  static async resetPassword(req: express.Request, res: express.Response) {
    try {
      const { email, token, newPassword } = req.body;
      const data = await UserService.resetPassword(email, token, newPassword);
      res.json(data);
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    }
  }

  static async updatePassword(req: express.Request, res: express.Response) {
    try {
      const { email, oldPassword, newPassword } = req.body;
      const data = await UserService.updatePassword(
        email,
        oldPassword,
        newPassword
      );
      res.json(data);
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    }
  }
}
