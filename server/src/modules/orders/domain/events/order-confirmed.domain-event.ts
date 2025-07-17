import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class OrderConfirmedDomainEvent extends DomainEvent {
  lineItems: Array<{
    productId: string;
    quantity: number;
    itemPrice: number;
    totalPrice: number;
    productImage: string;
    productName: string;
  }>;
  orderSlug: string;
  total: number;
  customerEmail: string;

  constructor(props: DomainEventProps<OrderConfirmedDomainEvent>) {
    super(props);
    this.lineItems = props.lineItems;
    this.orderSlug = props.orderSlug;
    this.total = props.total;
    this.customerEmail = props.customerEmail;
  }
}
