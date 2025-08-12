import cartModel from "../models/cart.model";
import productModel from "../models/product.model";

export class CartService {
  async addToCart(userId: string, productId: string, quantity: number) {
    if (quantity <= 0) {
      throw new Error("Quantidade deve ser maior que zero");
    }
    const prod = await productModel.findById(productId);
    if (!prod) {
      throw new Error("Produto não encontrado");
    }
    let cart = await cartModel.findOne({ user: userId });
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex !== -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    } else {
      cart = new cartModel({
        user: userId,
        items: [{ product: productId, quantity }],
      });
      await cart.save();
    }
    return await cartModel.findOne({ user: userId }).populate("items.product");
  }

}