import ProductsModel from '../models/product.model';
import { IProduct } from '../interfaces/product.interface';

export class ProductService {
  async createProduct(data: IProduct): Promise<IProduct> {
    return await new ProductsModel(data).save();
  }

  async getProductById(id: string): Promise<IProduct> {
    const product = await ProductsModel.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  async getAllProducts(): Promise<IProduct[]> {
    const products = await ProductsModel.find();
    if (!products || products.length === 0) {
      throw new Error("No products found");
    }
    return products;
  }

  async updateProduct(id: string, data: IProduct): Promise<IProduct> {
    const updatedProduct = await ProductsModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedProduct) {
      throw new Error("Product not found");
    }
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    const deletedProduct = await ProductsModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new Error("Product not found");
    }
  }
}
