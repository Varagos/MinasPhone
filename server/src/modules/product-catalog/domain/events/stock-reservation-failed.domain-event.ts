import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class StockReservationFailedDomainEvent extends DomainEvent {
  public readonly causationOrderId: string;
  public readonly productIds: string[];
  public readonly reason: string;

  constructor(props: DomainEventProps<StockReservationFailedDomainEvent>) {
    super(props);
    Object.assign(this, props);
  }
}
