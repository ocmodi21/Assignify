import { Request, Response } from "express";
import UserModel from "../models/user.model";
import AssignmentModel from "../models/assignment.model";

class AssignmentController {
  // Upload assignment
  async uploadAssignment(req: Request, res: Response): Promise<any> {
    const { userId, task, admin } = req.body;
    const { name } = (<any>req).user;

    // Check if the logged-in user matches the provided userId
    if (name !== userId) {
      return res.status(400).json({
        message:
          "User mismatch: logged-in user does not match provided user ID.",
      });
    }

    try {
      // Check if the provided user exists and has the role of 'user'
      const userIdRole = await UserModel.findOne({
        name: userId,
        role: "admin",
      });

      if (!userIdRole) {
        return res
          .status(404)
          .json({ message: "User not found. Please provide a valid user." });
      }

      // Check if the provided admin exists and has the role of 'admin'
      const adminExists = await UserModel.findOne({
        name: admin,
        role: "admin",
      });

      if (!adminExists) {
        return res
          .status(404)
          .json({ message: "Admin not found. Please provide a valid admin." });
      }

      // Create the assignment with the task and admin details
      const assignment = await AssignmentModel.create({ task, admin });

      // Respond with the created assignment data
      return res.status(201).json({
        message: "Assignment created successfully.",
        data: assignment,
      });
    } catch (error) {
      // Handle any errors during assignment creation
      return res
        .status(500)
        .json({ message: "Server error: Unable to create assignment." });
    }
  }

  // Get all assignments for an admin
  async getAllAssignment(req: Request, res: Response): Promise<any> {
    const { name } = (<any>req).user;

    try {
      // Check if the logged-in user is an admin
      const adminExists = await UserModel.findOne({
        name,
        role: "admin",
      });

      if (!adminExists) {
        return res.status(403).json({
          message: "Access denied: Only admins can view assignments.",
        });
      }

      // Find all assignments created by this admin
      const assignments = await AssignmentModel.find({ admin: name });

      // Check if any assignments exist
      if (!assignments || assignments.length === 0) {
        return res
          .status(404)
          .json({ message: "No assignments found for this admin." });
      }

      // Respond with the list of assignments
      return res.status(200).json({
        message: "Assignments retrieved successfully.",
        data: assignments,
      });
    } catch (error) {
      // Handle errors while retrieving assignments
      return res
        .status(500)
        .json({ message: "Server error: Unable to retrieve assignments." });
    }
  }

  // Accept an assignment
  async acceptAssignment(req: Request, res: Response): Promise<any> {
    const { name } = (<any>req).user;
    const assignmentId = req.params.id;

    try {
      // Check if the logged-in user is an admin
      const adminExists = await UserModel.findOne({
        name,
        role: "admin",
      });

      if (!adminExists) {
        return res.status(403).json({
          message: "Access denied: Only admins can accept assignments.",
        });
      }

      // Find the assignment by ID and update its status to "accepted"
      const updatedAssignment = await AssignmentModel.findByIdAndUpdate(
        assignmentId,
        { status: "accepted" },
        { new: true }
      );

      // Check if the assignment was found
      if (!updatedAssignment) {
        return res.status(404).json({ message: "Assignment not found." });
      }

      // Respond with the updated assignment data
      return res.status(200).json({
        message: "Assignment accepted successfully.",
        data: updatedAssignment,
      });
    } catch (error) {
      // Handle errors while accepting the assignment
      return res
        .status(500)
        .json({ message: "Server error: Unable to accept the assignment." });
    }
  }

  // Reject an assignment
  async rejectAssignment(req: Request, res: Response): Promise<any> {
    const { name } = (<any>req).user;
    const assignmentId = req.params.id;

    try {
      // Check if the logged-in user is an admin
      const adminExists = await UserModel.findOne({
        name,
        role: "admin",
      });

      if (!adminExists) {
        return res.status(403).json({
          message: "Access denied: Only admins can reject assignments.",
        });
      }

      // Find the assignment by ID and update its status to "rejected"
      const updatedAssignment = await AssignmentModel.findByIdAndUpdate(
        assignmentId,
        { status: "rejected" },
        { new: true }
      );

      // Check if the assignment was found
      if (!updatedAssignment) {
        return res.status(404).json({ message: "Assignment not found." });
      }

      // Respond with the updated assignment data
      return res.status(200).json({
        message: "Assignment rejected successfully.",
        data: updatedAssignment,
      });
    } catch (error) {
      // Handle errors while rejecting the assignment
      return res
        .status(500)
        .json({ message: "Server error: Unable to reject the assignment." });
    }
  }
}

export default new AssignmentController();
