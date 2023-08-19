import { CheckoutToken } from '@/types/checkout-token';

export interface ICheckoutApi {
  checkoutCart: () => Promise<CheckoutToken>;

  captureOrder(order: any): Promise<string>;

  findOrder(orderId: string): Promise<any>;
}
