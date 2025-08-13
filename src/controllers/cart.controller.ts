import { CartService } from "../services/cart.service";

export class CartController {
   async getCartByUserId(userId: string) {
      const cartService = new CartService();
      return cartService.getCartByUserId(userId);
   }

   async addToCart(userId: string, productId: string, quantity: number) {
    const cartService = new CartService();
    return cartService.addToCart(userId, productId, quantity);
   }
   
   async removeItemFromCart(userId: string, productId: string) {
      const cartService = new CartService();
      return cartService.removeItem(userId, productId);
   }

   async clearCart(userId: string) {
      const cartService = new CartService();
      return cartService.clearCart(userId);
   }

   async updateCartItem(userId: string, productId: string, quantity: number) {
      const cartService = new CartService();
      return cartService.addToCart(userId, productId, quantity);
   }
}