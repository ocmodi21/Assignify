import mongoose, { Schema, Document } from "mongoose";

export interface Assignment extends Document {
  title: string;
  admin: string;
  status: "accept" | "reject" | "pending";
}

const AssignmentSchema: Schema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    role: {
      type: String,
      required: true,
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
