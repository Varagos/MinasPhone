import { ICartService } from '../index.js';
import Commerce from '@chec/commerce.js';
import { Cart } from '../../../types/cart.js';

class CommerceJSCartService implements ICartService {
  constructor(private client: Commerce) {}

  async fetch(): Promise<Cart> {
    const cart = await this.client.cart.retrieve();
    return structuredClone(cart);
  }

  async addItemToCart(productId: string, quantity: number): Promise<Cart> {
    const { cart } = await this.client.cart.add(productId, quantity);
    return structuredClone(cart);
  }

  async empty(): Promise<Cart> {
    const { cart } = await this.client.cart.empty();
    return structuredClone(cart);
  }

  async removeFromCart(lineItemId: string): Promise<Cart> {
    const { cart } = await this.client.cart.remove(lineItemId);
    return structuredClone(cart);
  }

  async updateItem(lineItemId: string, quantity: number): Promise<Cart> {
    const { cart } = await this.client.cart.update(lineItemId, { quantity });
    return structuredClone(cart);
  }

  async refresh(): Promise<Cart> {
    const cart = await this.client.cart.refresh();
    return structuredClone(cart);
  }
}

export default CommerceJSCartService;
