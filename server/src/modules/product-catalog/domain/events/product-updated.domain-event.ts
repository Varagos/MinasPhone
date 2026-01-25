import { DomainEvent, DomainEventProps } from '@libs/ddd/domain-event.base';

export class ProductUpdatedDomainEvent extends DomainEvent {
  constructor(props: DomainEventProps<ProductUpdatedDomainEvent>) {
    super(props);
  }
}
