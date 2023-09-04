import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import * as routes from "./routes";
import mongoose from "mongoose";

dotenv.config();

const url = process.env.MONGO_URL || "mongodb://localhost:27017/rutina-dev";
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/clients", routes.clientRoute);
app.use("/exercises", routes.exerciseRoute);

mongoose
  .connect(url, {
    autoCreate: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));
