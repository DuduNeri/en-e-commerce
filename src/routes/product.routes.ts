import { Router, Request, Response } from "express";
import { ProductController } from "../controller/product.controller";
import { authMiddleware, AuthRequest } from "../middlewares/auth.user";

const productRouter = Router();
const productController = new ProductController();

// Criar produto (usuário logado)
productRouter.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const productData = { ...req.body, user: req.user!.id }; // corrigido para "user"
    const newProduct = await productController.create(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Listar produto por ID
productRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await productController.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    res.status(404).json({ message: "Product not found" });
  }
});

// Listar todos os produtos
productRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await productController.getAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Could not fetch products" });
  }
});

// Listar produtos do usuário logado
productRouter.get("/my-products/list", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const products = await productController.getProductsByUser(req.user!.id);
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching user products:", error);
    res.status(500).json({ message: "Could not fetch user products" });
  }
});

// Atualizar produto
productRouter.put("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const updatedProduct = await productController.update(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Could not update product" });
  }
});

// Deletar produto
productRouter.delete("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    await productController.delete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(404).json({ message: "Product not found" });
  }
});

export default productRouter;
