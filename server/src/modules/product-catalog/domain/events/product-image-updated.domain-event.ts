import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class ProductImageUpdatedDomainEvent extends DomainEvent {
  public readonly oldImageUri: string;

  constructor(props: DomainEventProps<ProductImageUpdatedDomainEvent>) {
    super(props);
    Object.assign(this, props);
  }
}
