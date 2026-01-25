import { DomainEvent, DomainEventProps } from '@libs/ddd/domain-event.base';

export class ProductCreatedDomainEvent extends DomainEvent {
  constructor(props: DomainEventProps<ProductCreatedDomainEvent>) {
    super(props);
  }
}
