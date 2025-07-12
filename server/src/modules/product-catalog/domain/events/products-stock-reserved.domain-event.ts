import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class ProductsStockReservedDomainEvent extends DomainEvent {
  public readonly causationOrderId: string;
  public readonly productIds: string[];

  constructor(props: DomainEventProps<ProductsStockReservedDomainEvent>) {
    super(props);
    Object.assign(this, props);
  }
}
