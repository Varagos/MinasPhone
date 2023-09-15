import { CheckoutToken } from '@/types/checkout-token';
import { ICheckoutApi } from '../types/types';
import { routes } from './config';

export class CheckoutApi implements ICheckoutApi {
  async checkoutCart(): Promise<CheckoutToken> {
    const res = await fetch(routes.v1.orders.checkout(), {
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

  captureOrder(order: any): Promise<string> {
    throw new Error('Method not implemented.');
  }
  findOrder(orderId: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
