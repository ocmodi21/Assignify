import { Request, Response } from "express";
import UserModel from "../models/user.model";
import passwordManager from "../utils/password-manager";
import authManager from "../utils/auth-manager";

class UserController {
  async login(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }

      const verified = passwordManager.comparePassword(password, user.password);
      if (!verified)
        return res.status(401).json({ message: "Incorrect Password." });

      const token = await authManager.generateToken(email, user.name);

      return res.status(200).json({ data: user, token });
    } catch (error) {
      res.status(500).json({ message: "Error while fetching user data." });
    }
  }

  async register(req: Request, res: Response): Promise<any> {
    const { name, email, password, role } = req.body;

    try {
      const userExists = await UserModel.findOne({ email: email, name: name });
      if (userExists) {
        return res.status(400).json({ message: "User already registered." });
      }

      const hash = passwordManager.hashPassword(password);

      const token = await authManager.generateToken(email, name);

      const user = await UserModel.create({
        name,
        email,
        password: hash,
        role,
      });

      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }

      return res.status(200).json({ data: user, token });
    } catch (error) {
      res.status(500).json({ message: "Error while creating user." });
    }
  }
}

export default new UserController();
