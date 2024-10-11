import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import logger from "./middlewares/logger/logger";
import userRoutes from "./routes/user.route";
import assignmentRoutes from "./routes/assignment.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

// api
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/assignment", assignmentRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.error(err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
