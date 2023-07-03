import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class ProductDeletedDomainEvent extends DomainEvent {
  public readonly imageUri: string;

  constructor(props: DomainEventProps<ProductDeletedDomainEvent>) {
    super(props);
    Object.assign(this, props);
  }
}
