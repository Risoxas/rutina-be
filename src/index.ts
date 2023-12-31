import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import * as routes from "./routes";
import mongoose from "mongoose";
import compression from "compression";

dotenv.config();

const url = process.env.DB_URL || "mongodb://localhost:27017/rutina-dev";
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());
app.use(compression());

app.use("/clients", routes.clientRoute);
app.use("/exercises", routes.exerciseRoute);
app.use("/users", routes.userRoute);

mongoose
  .connect(url, {
    autoCreate: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));
