import { ICartApi, Cart } from '../types/types';
import { Api } from './api';
import { routes } from './config';

export class CartApi implements ICartApi {
  private httpClient: Api<any>;

  constructor() {
    console.log('baseUrl', routes.v1.baseUrl);
    this.httpClient = new Api({
      baseUrl: routes.v1.baseUrl,
    });
  }

  async retrieveCart(): Promise<Cart> {
    const fetchWithClient =
      await this.httpClient.api.cartHttpControllerFetchOrCreate({
        credentials: 'include',
      });
    if (!fetchWithClient.ok) {
      // If some product is not found, because it was deleted from db for example
      if (fetchWithClient.status === 404) {
        // clear cart
        // THis can end up in infinite loop, if something goes wrong
        return this.clearCart();
      }
      console.log(
        'Failed to fetch cart with httpClient',
        fetchWithClient.error
      );
      throw new Error('Failed to fetch cart with httpClient');
    }
    console.log('Fetched cart with httpClient', fetchWithClient.data);
    const cart = fetchWithClient.data;
    return cart;

    // const res = await fetch(routes.v1.cart.retrieve(), {
    //   method: 'POST',
    //   credentials: 'include',
    // });

    // if (!res.ok) {
    //   throw new Error('Failed to fetch data');
    // }

    // return res.json();
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
