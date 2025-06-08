import { ICartApi, Cart } from '../types/types';
import { routes } from './config';

export class CartApi implements ICartApi {
  async retrieveCart(): Promise<Cart> {
    const res = await fetch(routes.v1.cart.retrieve(), {
      method: 'POST',
      credentials: 'include',
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }

  async clearCart(): Promise<Cart> {
    const res = await fetch(routes.v1.cart.empty(), {
      method: 'DELETE',
      credentials: 'include',
      redirect: 'follow',
    });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to clear cart');
    }

    return this.retrieveCart();
  }

  async addToCart(productId: string, quantity: number): Promise<Cart> {
    console.log({
      productId,
      quantity,
    });

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      productId,
      quantity,
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      credentials: 'include',
    };
    const res = await fetch(routes.v1.cart.addToCart(), requestOptions);
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to add line item');
    }

    const cart = await this.retrieveCart();
    console.log('Retrieved cart', cart);
    return cart;
  }

  async removeFromCart(lineItemId: string): Promise<Cart> {
    const res = await fetch(routes.v1.cart.removeFromCart(lineItemId), {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }

    return this.retrieveCart();
  }
  async updateLineItem(lineItemId: string, quantity: number): Promise<Cart> {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      quantity,
    });

    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      credentials: 'include',
    };

    const res = await fetch(
      routes.v1.cart.updateLineItem(lineItemId),
      requestOptions
    );
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to update line item');
    }

    return this.retrieveCart();
  }
}
