import { Router } from "express";
import assignmentController from "../controllers/assignment.controller";
import authUser from "../middlewares/auth.middleware";

const router = Router();

router.post("/upload", authUser, assignmentController.uploadAssignment);
router.get("/assignments", authUser, assignmentController.getAllAssignment);
router.post("/:id/accept", authUser, assignmentController.acceptAssignment);
router.post("/:id/reject", authUser, assignmentController.rejectAssignment);

export default router;
