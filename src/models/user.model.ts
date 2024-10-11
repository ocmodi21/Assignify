import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  recStatus: boolean;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    recStatus: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;
