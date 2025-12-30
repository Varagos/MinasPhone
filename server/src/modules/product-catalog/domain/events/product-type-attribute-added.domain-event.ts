import { DomainEvent, DomainEventProps } from '@libs/ddd';
import { AggregateID } from '@libs/ddd/index';

export class ProductTypeAttributeAddedDomainEvent extends DomainEvent {
  public readonly attributeId: AggregateID;

  constructor(props: DomainEventProps<ProductTypeAttributeAddedDomainEvent>) {
    super(props);
    this.attributeId = props.attributeId;
  }
}
