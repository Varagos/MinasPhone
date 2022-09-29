import { Cart } from '../../../types/cart.js';
import { ICartService } from '../index.js';
import { mockCart } from './mockData';

class MockCartService implements ICartService {
  private cart: Cart = mockCart;

  async fetch(): Promise<Cart> {
    return structuredClone(this.cart);
  }

  async addItemToCart(productId: string, quantity: number): Promise<Cart> {
    throw new Error('Method not implemented.');
  }

  async empty(): Promise<Cart> {
    throw new Error('Method not implemented.');
  }

  async removeFromCart(productId: string): Promise<Cart> {
    throw new Error('Method not implemented.');
  }

  async updateItem(productId: string, quantity: number): Promise<Cart> {
    throw new Error('Method not implemented.');
  }

  async refresh(): Promise<Cart> {
    throw new Error('Method not implemented.');
  }
}

export default MockCartService;
