import { Router, Request, Response } from "express";
import { ProductController } from "../controller/ProductController";

const productRouter = Router();

productRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newProduct = await new ProductController().create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

export default productRouter;