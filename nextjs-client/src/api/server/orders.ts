import { routes } from './config';
import { ICheckoutApi } from '../types/types';

export class OrdersApi implements ICheckoutApi {
  async checkoutOrder(params: {
    contactInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
  }): Promise<{ orderId: string }> {
    const { contactInfo } = params;
    const { firstName, lastName, email, phone } = contactInfo;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers,
      body,
      redirect: 'follow',
      credentials: 'include',
    };

    const res = await fetch(routes.v1.orders.checkout(), requestOptions);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    const { id: orderId } = data;

    console.log({ data });
    return { orderId };
  }
  findOrderById(orderId: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  findOrderBySlug(slug: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
