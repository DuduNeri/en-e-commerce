import { CartController } from "../controllers/cart.controller";
import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth.user";
import productModel from "../models/product.model";

const cartRoute = Router();

cartRoute.post("/", authMiddleware, async (req: Request & { user?: any }, res: Response) => {
  try {
    const userId = req.user!.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ success: false, message: "productId e quantity são obrigatórios." });
    }

    // Aqui o service vai lançar erro se não houver estoque suficiente
    const cartItem = await new CartController().addToCart(userId, productId, quantity);

    return res.status(201).json({ success: true, cart: cartItem });

  } catch (error: any) {
    console.error("❌ Erro ao adicionar item ao carrinho:", error);

    // Retorna a mensagem do erro lançado pelo service
    return res.status(400).json({ success: false, message: error.message });
  }
});


cartRoute.delete("/:productId", authMiddleware, async (req: Request & { user?: any }, res: Response) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const cartItem = await new CartController().removeItemFromCart(userId, productId);
    res.status(200).json(cartItem);
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error);
    res.status(500).json({ message: "Não foi possível remover o item do carrinho." });
  }
})

cartRoute.get("/", authMiddleware, async (req: Request & { user?: any }, res: Response) => {
  try {
    const userId = req.user.id.params;
    const cart = await new CartController().getCartByUserId(userId);
    res.status(200).json(cart);
  } catch (error) {
    console.error("Erro ao obter carrinho:", error);
    res.status(500).json({ message: "Não foi possível obter o carrinho." });
  }
});

cartRoute.delete("/", authMiddleware, async (req: Request & { user?: any }, res: Response) => {
  try {
    const userId = req.user.id;
    const cart = await new CartController().clearCart(userId);
    res.status(200).json(cart);
  } catch (error) {
    console.error("Erro ao limpar carrinho:", error);
    res.status(500).json({ message: "Não foi possível limpar o carrinho." });
  }
});

cartRoute.put("/:productId", authMiddleware, async (req: Request & { user?: any }, res: Response) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const { quantity } = req.body;

    const updatedCart = await new CartController().updateCartItem(userId, productId, quantity);
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Erro ao atualizar item do carrinho:", error);
    res.status(500).json({ message: "Não foi possível atualizar o item do carrinho." });
  }
});

export default cartRoute;