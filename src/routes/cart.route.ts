import { CartController } from "../controllers/cart.controller";
import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth.user";

const cartRoute = Router();

cartRoute.post("/", authMiddleware, async (req: Request & { user?: any }, res: Response) => {
  try {
    const userId = req.user.id; 
    const { productId, quantity } = req.body;

    const cartItem = await new CartController().addToCart(userId, productId, quantity);

    res.status(201).json(cartItem);
  } catch (error) {
    console.error("Erro ao adicionar item ao carrinho:", error);
    res.status(500).json({ message: "Não foi possível adicionar o item ao carrinho." });
  }
});


export default cartRoute;