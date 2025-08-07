import ProductsModel from '../models/ProductsModel';
import { IProduct } from './../types/ProductTypes';

export class ProductService {
  async createProduct(data: IProduct): Promise<IProduct> {
    try {
      const newProduct = await new ProductsModel(data).save();
      return newProduct;
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Could not create product");
    }
  }
}