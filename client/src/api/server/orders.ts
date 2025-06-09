import { routes } from './config';
import { IOrdersApi, Order } from '../types/types';

export class OrdersApi implements IOrdersApi {
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
      throw new Error('Failed to checkout order');
    }

    const data = await res.json();
    const { id: orderId } = data;

    console.log({ data });
    return { orderId };
  }

  async findOrderById(orderId: string): Promise<Order> {
    const res = await fetch(routes.v1.orders.findOne(orderId));
    const data = await res.json();
    return data;
  }

  async findOrderBySlug(slug: string): Promise<any> {
    const res = await fetch(routes.v1.orders.findOneBySlug(slug));
    const data = await res.json();
    return data;
  }
}
