import mongoose, { Schema, Document } from "mongoose";

export interface Assignment extends Document {
  task: string;
  admin: string;
  status: "accept" | "reject" | "pending";
}

const AssignmentSchema: Schema = new Schema(
  {
    task: { type: String, required: true },
    status: {
      type: String,
      enum: ["accept", "reject", "pending"],
      default: "pending",
    },
    admin: { type: String, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const AssignmentModel = mongoose.model<Assignment>(
  "Assignment",
  AssignmentSchema
);

export default AssignmentModel;
