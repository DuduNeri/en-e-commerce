import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoutes from "./routes/UserRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", UserRoutes);

export default app;
