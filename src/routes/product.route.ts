import { Router, Request, Response } from "express";
import { ProductController } from "../controllers/product.controller";
import { authMiddleware} from "../middlewares/auth.user";
import { CheckProductOwner } from "../middlewares/check.product.owner";
import { AuthRequest } from "../interfaces/auth.interface";
import { isAdmin } from "../middlewares/its.admin";
import { validate } from "../middlewares/validation";

const productRouter = Router();
const productController = new ProductController();

productRouter.post("/", authMiddleware, validate , async (req: AuthRequest, res: Response) => {
  try {
    const productData = { ...req.body, user: req.user!.id }; 
    const newProduct = await productController.create(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

productRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await productController.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    res.status(404).json({ message: "Product not found" });
  }
});

productRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await productController.getAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Could not fetch products" });
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

productRouter.put("/:id", authMiddleware, CheckProductOwner.checkOwner, async (req: AuthRequest, res: Response) => {
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

productRouter.delete("/:id", authMiddleware, isAdmin, CheckProductOwner.checkOwner, async (req: AuthRequest, res: Response) => {
  try {
    await productController.delete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(404).json({ message: "Product not found" });
  }
});

export default productRouter;
