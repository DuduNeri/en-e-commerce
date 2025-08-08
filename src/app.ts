import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.routes";
import ProductRoutes from "./routes/product.routes";
import AuthRoute from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", UserRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/auth", AuthRoute);

export default app;
