import { ICartService } from '../index';
import { getApiUrl } from '../../httpClient';
import { Cart } from '../../../types/cart';
import { rawPriceToFormatted } from '../../products/server';

type CartDTO = {
  id: string;
  items: Array<{
    id: string;
    productId: string;
    quantity: number;
    title: string;
    unitPrice: number;
    media: {
      src: string;
    };
  }>;
  createdAt: number;
  updatedAt: number;
  subTotal: number;
};

const mapCartDTOToCart = (cartDTO: CartDTO): Cart => {
  return {
    id: cartDTO.id,
    line_items: cartDTO.items.map((item) => ({
      id: item.id,
      product_id: item.productId,
      quantity: item.quantity,
      name: item.title,
      product_name: item.title,
      price: rawPriceToFormatted(item.unitPrice),
      media: {
        source: item.media.src,
      },
      sku: 'todo' as any,
      line_total: rawPriceToFormatted(item.unitPrice * item.quantity), // check this
      selected_options: [],
      permalink: 'todo' as any,
      product_meta: 'todo' as any,
      image: 'todo' as any,
    })),
    created: cartDTO.createdAt,
    updated: cartDTO.updatedAt,
    expires: 'todo' as any,
    total_items: cartDTO.items.reduce((acc, item) => acc + item.quantity, 0),
    total_unique_items: cartDTO.items.length,
    subtotal: rawPriceToFormatted(cartDTO.subTotal),
    currency: 'todo' as any,
    discount_code: 'todo' as any,
    hosted_checkout_url: 'todo' as any,
  };
};

class CartService implements ICartService {
  private apiBaseUrl = getApiUrl() + '/carts';

  async fetch(): Promise<Cart> {
    //Fetch cart, if ok return

    // If not, create cart, return
    try {
      const cart: CartDTO = await this.retrieveCart();
      return mapCartDTOToCart(cart);
    } catch (error) {
      console.error('Error:', error);
      // if 404
      await this.createCart();
      const cart: CartDTO = await this.retrieveCart();
      return mapCartDTOToCart(cart);
    }
  }
  private async retrieveCart(): Promise<any> {
    return this.makeHttpRequest(this.apiBaseUrl, 'GET');
  }

  private async createCart(): Promise<Cart> {
    return this.makeHttpRequest(this.apiBaseUrl, 'POST', undefined, 'text');
  }

  async addItemToCart(productId: string, quantity: number): Promise<Cart> {
    try {
      await this.makeHttpRequest(`${this.apiBaseUrl}/add`, 'POST', { productId, quantity }, 'text');

      const cart: CartDTO = await this.retrieveCart();
      return mapCartDTOToCart(cart);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async empty(): Promise<Cart> {
    await this.makeHttpRequest(`${this.apiBaseUrl}/items`, 'DELETE', undefined, 'text');

    const cart: CartDTO = await this.retrieveCart();
    return mapCartDTOToCart(cart);
  }

  async removeFromCart(lineItemId: string): Promise<Cart> {
    await this.makeHttpRequest(`${this.apiBaseUrl}/items/${lineItemId}`, 'DELETE', undefined, 'text');

    const cart: CartDTO = await this.retrieveCart();
    return mapCartDTOToCart(cart);
  }

  async updateItem(lineItemId: string, quantity: number): Promise<Cart> {
    const data = { quantity };
    await this.makeHttpRequest(`${this.apiBaseUrl}/items/${lineItemId}`, 'PUT', data, 'text');

    const cart: CartDTO = await this.retrieveCart();
    return mapCartDTOToCart(cart);
  }

  async refresh(): Promise<Cart> {
    await this.deleteCart();
    await this.createCart();
    return this.retrieveCart();
  }

  private async deleteCart() {
    return this.makeHttpRequest(this.apiBaseUrl, 'DELETE', undefined, 'text');
  }

  private makeHttpRequest = async (
    url: string,
    method: 'POST' | 'GET' | 'PUT' | 'DELETE',
    data?: any,
    responseContentType?: 'text' | 'json'
  ) => {
    const options: RequestInit = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const contentType = response.headers.get('Content-Type'); // -> "text/html; charset=utf-8"
    if (responseContentType === 'text' || (contentType && /text\/html/i.test(contentType))) {
      const text = await response.text();
      return text;
    }

    const jsonData = await response.json();
    return jsonData;
  };
}

export default CartService;
