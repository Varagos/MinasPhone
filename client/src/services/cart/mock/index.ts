import { Cart } from '../../../types/cart.js';
import { IProductsService } from '../../products/index.js';
import { ICartService } from '../index.js';
import { mockCart } from './mockData';

class MockCartService implements ICartService {
  private cart: Cart = mockCart;

  constructor(private productsService: IProductsService) {}

  async fetch(): Promise<Cart> {
    return structuredClone(this.cart);
  }

  async addItemToCart(productId: string, quantity: number): Promise<Cart> {
    const product = await this.productsService.fetchItemById(productId);
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
