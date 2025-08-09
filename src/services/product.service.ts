import ProductModel from "../models/product.model";
import type { IProduct } from "../interfaces/product.interface";

export class ProductService {
  async createProduct(data: IProduct) {
    return ProductModel.create(data);
  }

  async getProductById(id: string) {
    return ProductModel.findById(id).populate("user", "name email");
  }

  async getAllProducts() {
    return ProductModel.find().populate("user", "name email");
  }

  async getProductsByUser(userId: string) {
    return ProductModel.find({ user: userId }).populate("user", "name email");
  }

  async updateProduct(id: string, data: IProduct) {
    return ProductModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProduct(id: string) {
    return ProductModel.findByIdAndDelete(id);
  }
}
