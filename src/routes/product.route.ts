import { Router, Response } from "express";
import { ProductController } from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth.user";
import { AuthRequest } from "../interfaces/auth.interface";
import { Types } from "mongoose";

const productRouter = Router();
const productController = new ProductController();

productRouter.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {

    if (!req.body.name || !req.body.price || !req.body.category || !req.body.stock || !req.body.description || !req.body.title) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const productData = {
      ...req.body,
      user: new Types.ObjectId(req.user!.id),
      owner: new Types.ObjectId(req.user!.id)
    };

    const newProduct = await productController.create(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

productRouter.get("/my-products/list", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const products = await productController.getProductsByUser(req.user!.id);
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching user products:", error);
    res.status(500).json({ message: "Could not fetch user products" });
  }
});

productRouter.get("/", async (_req, res: Response) => {
  try {
    const products = await productController.getAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Could not fetch products" });
  }
});

productRouter.get("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const product = await productController.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    res.status(500).json({ message: "Could not fetch product" });
  }
});

productRouter.put("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const updatedProduct = await productController.update(req.params.id, req.body);
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("❌ Error updating product:", error);
    res.status(500).json({ message: "Could not update product" });
  }
});

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
