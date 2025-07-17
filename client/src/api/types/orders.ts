import { OrderResponseDto } from '../server/api';
import * as O from 'fp-ts/Option';

export type CheckoutOrderParams = {
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
};

export type Order = OrderResponseDto;

export interface IOrdersApi {
  checkoutOrder(params: CheckoutOrderParams): Promise<{ orderId: string }>;

  findOrderById(orderId: string): Promise<Order>;
  findOrderBySlug(slug: string): Promise<O.Option<Order>>;
}
