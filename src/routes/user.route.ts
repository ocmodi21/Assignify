import { Router } from "express";
import authController from "../controllers/auth.controller";
import assignmentController from "../controllers/assignment.controller";
import authUser from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/upload", authUser, assignmentController.uploadAssignment);
router.get("/admins", authUser, authController.getAllAdmins);

export default router;
