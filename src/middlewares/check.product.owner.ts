import { Response, NextFunction, RequestHandler } from "express";
import { AuthRequest } from "../types/auth.request";
import Product from "../models/product.model";

export class CheckProductOwner {
  static checkOwner: RequestHandler = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404).json({ message: "Produto não encontrado" });
        return;
      }
      if (product.user.toString() !== req.user!.id) {
        res.status(403).json({ message: "Você não tem permissão para modificar este produto" });
        return;
      }
      next();
    } catch (error) {
      console.error("❌ Erro ao verificar dono do produto:", error);
      res.status(500).json({ message: "Erro ao verificar proprietário do produto" });
    }
  };
}
