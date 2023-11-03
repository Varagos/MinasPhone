import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class OrderCancelledDomainEvent extends DomainEvent {
  readonly lineItems: Array<{
    readonly productId: string;
    readonly quantity: number;
  }>;

  constructor(props: DomainEventProps<OrderCancelledDomainEvent>) {
    super(props);
    this.lineItems = props.lineItems;
  }
}
