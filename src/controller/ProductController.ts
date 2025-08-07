import { ProductService } from "../services/ProductService";
import type { IProduct } from "../types/ProductTypes";

const productService = new ProductService();

export class ProductController {
  async create(data: IProduct) {
    return productService.createProduct(data);
  }

  async getProductById(id: string) {
    return productService.getProductById(id);
  }

  async getAll() {
    return productService.getAllProducts();
  }

  async update(id: string, data: IProduct) {
    return productService.updateProduct(id, data);
  }

  async delete(id: string) {
    return productService.deleteProduct(id);
  }
}

