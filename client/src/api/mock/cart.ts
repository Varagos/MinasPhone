import { ICartApi, Cart } from '../types/types';

export class CartApi implements ICartApi {
  retrieveCart(): Promise<Cart> {
    throw new Error('Method not implemented.');
  }
  clearCart(): Promise<Cart> {
    throw new Error('Method not implemented.');
  }
  addToCart(productId: string, quantity: number): Promise<Cart> {
    throw new Error('Method not implemented.');
  }
  removeFromCart(lineItemId: string): Promise<Cart> {
    throw new Error('Method not implemented.');
  }
  updateLineItem(lineItemId: string, quantity: number): Promise<Cart> {
    throw new Error('Method not implemented.');
  }
}
