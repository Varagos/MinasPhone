import { DomainEvent, DomainEventProps } from '@libs/ddd';
import { AggregateID } from '@libs/ddd/index';

export class ProductTypeAttributeRemovedDomainEvent extends DomainEvent {
  public readonly attributeId: AggregateID;

  constructor(props: DomainEventProps<ProductTypeAttributeRemovedDomainEvent>) {
    super(props);
    this.attributeId = props.attributeId;
  }
}
