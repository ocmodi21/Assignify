import { NextFunction, Request, Response } from "express";
import Joi from "joi";

// Define validation schema for assignment upload requests
const assignmentUploadSchema = Joi.object({
  userId: Joi.string().required(),
  task: Joi.string().required(),
  admin: Joi.string().required(),
});

class AssignmentSchemaValidator {
  // Validate upload assignment request body
  uploadAssignmentValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    try {
      // Validate request body against the assignment schema
      const { error } = assignmentUploadSchema.validate(req.body);

      // If validation fails, respond with the error message
      if (error) {
        return res
          .status(400)
          .send({ message: `Validation error: ${error.details[0].message}` });
      }

      // If validation passes, proceed to the next middleware or route handler
      next();
    } catch (error) {
      return next(
        new Error("Server error: Invalid request body for assignment upload.")
      ); // Handle server-side validation errors
    }
  }
}

export default new AssignmentSchemaValidator();
