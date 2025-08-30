import ProductModel from "../models/product.model";
import type { IProduct } from "../interfaces/product.interface";

export class ProductService {
  async createProduct(data: IProduct) {
    const product = await ProductModel.create(data);
    if (!product) throw new Error("Failed to create product");
    return product;
  }

  async getProductById(id: string) {
    const product = await ProductModel.findById(id).populate("user", "name email");
    if (!product) throw new Error("Product not found");
    return product;
  }

  async getAllProducts() {
    return ProductModel.find().populate("user", "name email");
  }

  async getProductsByUser(userId: string) {
    return ProductModel.find({ user: userId }).populate("user", "name email");
  }

  async updateProduct(id: string, data: IProduct) {
    const updated = await ProductModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new Error("Product not found for update");
    return updated;
  }

  async deleteProduct(id: string) {
    const deleted = await ProductModel.findByIdAndDelete(id);
    if (!deleted) throw new Error("Product not found for delete");
    return deleted;
  }
}
