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
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
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
      productId: '9f72ea0d-fcf6-49c7-b7a0-8920fb3062b9',
      quantity: 1,
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

    return this.retrieveCart();
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
    const res = await fetch(routes.v1.cart.updateLineItem(lineItemId), {
      method: 'PUT',
      body: JSON.stringify({
        quantity,
      }),
      credentials: 'include',
    });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }

    return this.retrieveCart();
  }
}
