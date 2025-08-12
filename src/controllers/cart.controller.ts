import { CartService } from "../services/cart.service";

export class CartController {
   async addToCart(userId: string, productId: string, quantity: number) {
    const cartService = new CartService();
    return cartService.addToCart(userId, productId, quantity);
   }
}