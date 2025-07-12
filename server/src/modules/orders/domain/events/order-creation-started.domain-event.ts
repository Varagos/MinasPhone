import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class OrderCreationStartedDomainEvent extends DomainEvent {
  readonly lineItems: Array<{
    readonly productId: string;
    readonly quantity: number;
  }>;

  constructor(props: DomainEventProps<OrderCreationStartedDomainEvent>) {
    super(props);
    this.lineItems = props.lineItems;
  }
}
