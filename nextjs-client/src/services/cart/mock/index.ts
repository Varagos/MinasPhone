import { Cart } from '../../../types/cart.js';
import { IProductsService } from '../../products/index.js';
import { ICartService, LineItem } from '../index.js';
import { mockCart } from './mockData';

class MockCartService implements ICartService {
  private cart: Cart = mockCart;

  constructor(private productsService: IProductsService) {}

  async fetch(): Promise<Cart> {
    return structuredClone(this.cart);
  }

  async addItemToCart(productId: string, quantity: number): Promise<Cart> {
    const product = await this.productsService.fetchItemById(productId);
    const cartLineItem: LineItem = {
      id: '1',
      name: product.name,
      quantity,
      product_id: product.id,
      product_name: product.name,
      product_meta: product.meta,
      sku: product.sku!,
      permalink: product.permalink,
      media: product.media,
      // selected_options: product.selected_options,
      selected_options: [],
      // variant: product.variant,
      price: product.price,
      line_total: product.price,
      image: product.image,
    };
    this.cart.line_items.push(cartLineItem);
    this.cart.total_items += quantity;
    this.cart.total_unique_items += 1;
    return structuredClone(this.cart);
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
