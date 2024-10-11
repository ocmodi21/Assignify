import { Request, Response } from "express";
import UserModel from "../models/user.model";
import passwordManager from "../utils/password-manager";
import authManager from "../utils/auth-manager";

class UserController {
  // Login user
  async login(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;

    try {
      // Check if a user with the given email exists
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found. Please register first." });
      }

      // Verify the provided password against the stored hashed password
      const verified = passwordManager.comparePassword(password, user.password);
      if (!verified) {
        return res
          .status(401)
          .json({ message: "Incorrect password. Please try again." });
      }

      // Generate authentication token for the user
      const token = await authManager.generateToken(email, user.name);

      // Respond with user data and authentication token
      return res
        .status(200)
        .json({ message: "Login successful.", data: user, token });
    } catch (error) {
      // Handle any errors during login
      return res
        .status(500)
        .json({ message: "Server error: Unable to process login request." });
    }
  }

  // Register a new user
  async register(req: Request, res: Response): Promise<any> {
    const { name, email, password, role } = req.body;

    try {
      // Check if a user with the given email and name already exists
      const userExists = await UserModel.findOne({ email: email, name: name });
      if (userExists) {
        return res
          .status(409)
          .json({ message: "User already registered with this email." });
      }

      // Hash the password before storing it in the database
      const hash = passwordManager.hashPassword(password);

      // Generate authentication token for the new user
      const token = await authManager.generateToken(email, name);

      // Create a new user record in the database
      const user = await UserModel.create({
        name,
        email,
        password: hash,
        role,
      });

      // Check if user creation was successful
      if (!user) {
        return res
          .status(500)
          .json({ message: "Error creating user. Please try again later." });
      }

      // Respond with the newly created user data and authentication token
      return res
        .status(201)
        .json({ message: "User registered successfully.", data: user, token });
    } catch (error) {
      // Handle any errors during user registration
      return res
        .status(500)
        .json({ message: "Server error: Unable to register user." });
    }
  }
}

export default new UserController();
