import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./routes/user.route";
import productRouter from "./routes/product.route";
import AuthRoute from "./routes/auth.route";
import cartRoute from "./routes/cart.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", UserRoute);
app.use("/products", productRouter);
app.use("/auth", AuthRoute);
app.use("/cart", cartRoute);

export default app;
