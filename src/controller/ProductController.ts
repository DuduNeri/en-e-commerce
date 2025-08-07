import { ProductService } from "../services/ProductService";

export class ProductController {
  async create(data: any) {
    return await new ProductService().createProduct(data);
  }
}