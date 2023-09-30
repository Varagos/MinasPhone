import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class OrderCreatedDomainEvent extends DomainEvent {
  readonly lineItems: Array<{
    readonly productId: string;
    readonly quantity: number;
  }>;

  constructor(props: DomainEventProps<OrderCreatedDomainEvent>) {
    super(props);
    this.lineItems = props.lineItems;
  }
}
