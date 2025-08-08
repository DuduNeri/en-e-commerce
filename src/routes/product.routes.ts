import { Router, Request, Response } from "express";
import { ProductController } from "../controller/product.controller";
import { authMiddleware, AuthRequest } from "../middlewares/auth.user";

const productRouter = Router();

productRouter.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const productData = { ...req.body, userId: req.user!.id };
    const newProduct = await new ProductController().create(productData);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product ❌ :", error);
    res.status(500).json({ message: "Internal server error ❌" });
  }
});


productRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await new ProductController().getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    res.status(404).json({ message: "❌ Product not found" });
  }
})

productRouter.get("/", async (req: Request, res: Response) => {
  try {
    const products = await new ProductController().getAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "❌ Could not fetch products" });
  }
})

productRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedProduct = await new ProductController().update(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ message: "❌ Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "❌ Could not update product" });
  }
})

productRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    await new ProductController().delete(req.params.id);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(404).json({ message: "❌ Product not found" });
  }
})


export default productRouter;