import { DomainEvent, DomainEventProps } from '@libs/ddd';
import { AggregateID } from '@libs/ddd/index';
import { ProductTypeAttributeConfig } from '../value-objects/product-type-attribute-config.value-object';

export class ProductTypeAttributeModifiedDomainEvent extends DomainEvent {
  public readonly attributeId: AggregateID;
  public readonly oldConfig: ProductTypeAttributeConfig;
  public readonly newConfig: ProductTypeAttributeConfig;

  constructor(
    props: DomainEventProps<ProductTypeAttributeModifiedDomainEvent>,
  ) {
    super(props);
    this.attributeId = props.attributeId;
    this.oldConfig = props.oldConfig;
    this.newConfig = props.newConfig;
  }
}
