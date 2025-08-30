import cartModel from "../models/cart.model";
import productModel from "../models/product.model";
import mongoose from "mongoose";


export class CartService {
  async getCartByUserId(userId: string) {
    const cart = await cartModel
      .findOne({ user: new mongoose.Types.ObjectId(userId) })
      .populate("items.product");
    if (!cart) {
      throw new Error("Carrinho não encontrado para este usuário");
    }
    return cart;
  }
  
  async addToCart(userId: string, productId: string, quantity: number) {
    const product = await productModel.findById(productId);
    if (!product)
      throw new Error("Produto não encontrado");
    if (quantity <= 0)
      throw new Error("A quantidade deve ser maior que zero");
    if (quantity > product.stock)
      throw new Error("Quantidade solicitada excede o estoque disponível");

    let cart = await cartModel.findOne({ user: userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

      if (itemIndex !== -1) {
        if (cart.items[itemIndex].quantity + quantity > product.stock) {
          throw new Error("Quantidade total no carrinho excede o estoque disponível");
        }
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: product._id, quantity });
      }
      await cart.save();
    } else {
      cart = new cartModel({
        user: userId,
        items: [{ product: product._id, quantity }]
      });
      await cart.save();
    }
    return await cartModel.findOne({ user: userId }).populate("items.product");
  }

  async removeItem(userId: string, productId: string) {
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      throw new Error("Carrinho não encontrado");
    }
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      throw new Error("Produto não encontrado no carrinho");
    }
    cart.items.splice(itemIndex, 1);
    await cart.save();
    return await cartModel.findOne({ user: userId }).populate("items.product");
  }

  async clearCart(userId: string) {
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      throw new Error("Carrinho não encontrado");
    }
    cart.items = [];
    await cart.save();
    return cart;
  }

  async updateItemQuantity(userId: string, productId: string, quantity: number) {
    if (quantity <= 0) {
      throw new Error("Quantidade deve ser maior que zero");
    }
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      throw new Error("Carrinho não encontrado");
    }
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      throw new Error("Produto não encontrado no carrinho");
    }
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    return await cartModel.findOne({ user: userId }).populate("items.product");
  }
}