import { Router } from "express";
import assignmentController from "../controllers/assignment.controller";
import authUser from "../middlewares/auth.middleware";
import authController from "../controllers/auth.controller";
import authSchema from "../schemas/auth.schema";

const router = Router();

router.post("/login", authSchema.loginValidator, authController.login);
router.post("/register", authSchema.registerValidator, authController.register);
router.get("/assignments", authUser, assignmentController.getAllAssignment);
router.post(
  "/assignment/:id/accept",
  authUser,
  assignmentController.acceptAssignment
);
router.post(
  "/assignment/:id/reject",
  authUser,
  assignmentController.rejectAssignment
);

export default router;
