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

  constructor(props: DomainEventProps<OrderConfirmedDomainEvent>) {
    super(props);
    this.lineItems = props.lineItems;
  }
}
