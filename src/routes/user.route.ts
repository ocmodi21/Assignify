import { Router } from "express";
import authController from "../controllers/auth.controller";
import assignmentController from "../controllers/assignment.controller";
import authUser from "../middlewares/auth.middleware";
import authSchema from "../schemas/auth.schema";
import assignmentSchema from "../schemas/assignment.schema";

const router = Router();

router.post("/login", authSchema.loginValidator, authController.login);
router.post("/register", authSchema.registerValidator, authController.register);
router.post(
  "/upload",
  authUser,
  assignmentSchema.uploadAssignmentValidator,
  assignmentController.uploadAssignment
);
router.get("/admins", authUser, authController.getAllAdmins);

export default router;
