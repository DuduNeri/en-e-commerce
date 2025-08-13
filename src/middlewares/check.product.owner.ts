import { Response, NextFunction, RequestHandler } from "express";
import { AuthRequest } from "../interfaces/auth.interface";
import Product from "../models/product.model";

export class CheckProductOwner {
  static checkOwner: RequestHandler = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const product = await Product.findById(req.params.id);
      console.log("Checking product owner for product:", product); 
      if (!product) {
        res.status(404).json({ message: "Produto não encontrado" });
        return;
      }
      if (product.user.toString() !== req.user!.id) {
        res.status(403).json({ message: "Você não tem permissão para modificar este produto" });
        return;
      }
      console.log("Product owner verified:", req.user!.id); // debug
      next();
    } catch (error) {
      console.error("❌ Erro ao verificar dono do produto:", error);
      res.status(500).json({ message: "Erro ao verificar proprietário do produto" });
    }
  };
}
