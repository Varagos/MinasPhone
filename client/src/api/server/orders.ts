import { routes } from './config';
import { IOrdersApi, Order } from '../types/types';
import { Api, OrderCreatedResponseDto, OrderResponseDto } from './api';

export class OrdersApi implements IOrdersApi {
  private httpClient: Api<any>;

  constructor() {
    this.httpClient = new Api({
      baseUrl: routes.v1.baseUrl,
    });
  }

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

    const data = (await res.json()) as OrderCreatedResponseDto;
    const { id: orderId, slug } = data;

    console.log({ data });
    // Start polling for order status
    console.log(`Polling for order status for orderId: ${orderId}`);
    await this.pollOrderStatus(orderId);

    return { orderId: slug };
  }

  private async pollOrderStatus(
    orderId: string,
    maxAttempts: number = 30,
    intervalMs: number = 1000
  ): Promise<void> {
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        console.log(
          `Polling order status for orderId: ${orderId}, attempt: ${
            attempts + 1
          }`
        );
        const order = await this.findOrderById(orderId);

        // Check if order is in a final state
        if (order.status === 'confirmed') {
          console.log(`Order ${orderId} is ${order.status}`);
          return;
        }

        if (order.status === 'cancelled') {
          throw new Error(`Order ${orderId} ${order.status}`);
        }

        // Wait before next poll
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
        attempts++;
      } catch (error) {
        console.error('Error polling order status:', error);
        throw error;
      }
    }

    throw new Error(
      `Order ${orderId} status polling timed out after ${maxAttempts} attempts`
    );
  }

  async findOrderById(orderId: string): Promise<Order> {
    const response = await this.httpClient.api.ordersHttpControllerFindOne(
      orderId
    );

    if (!response.ok) {
      console.error('Failed to fetch product slugs', response);
      throw new Error('Failed to fetch product slugs');
    }
    return response.data;
  }

  async findOrderBySlug(slug: string): Promise<OrderResponseDto> {
    const response =
      await this.httpClient.api.ordersHttpControllerFindOneBySlug(slug);

    if (!response.ok) {
      console.error('Failed to fetch product slugs', response);
      throw new Error('Failed to fetch product slugs');
    }
    return response.data;
  }
}
