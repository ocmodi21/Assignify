import { Request, Response, NextFunction } from "express";
import authManager from "../utils/auth-manager";

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader === undefined || !authHeader.startsWith("Bearer "))
    return next(new Error("You must be authenticated"));

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await authManager.verifyToken(token);
    (<any>req).user = decoded;
    next();
  } catch (e) {
    return next(new Error("Invalid Token"));
  }
};

export default authUser;
