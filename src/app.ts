import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./routes/user.route";
import ProductRoute from "./routes/product.route";
import AuthRoute from "./routes/auth.route";
import cartRoute from "./routes/cart.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", UserRoute);
app.use("/api/products", ProductRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/cart", cartRoute);

export default app;
