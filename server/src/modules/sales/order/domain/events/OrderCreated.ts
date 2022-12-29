import { IDomainEvent } from '../../../../../shared/domain/events/IDomainEvent.js';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID.js';
import { Order } from '../Order.js';

export class OrderCreatedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public order: Order;

  constructor(order: Order) {
    this.dateTimeOccurred = new Date();
    this.order = order;
  }

  getAggregateId(): UniqueEntityID {
    return this.order.id;
  }
}
