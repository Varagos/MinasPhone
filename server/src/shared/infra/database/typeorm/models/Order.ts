import {
  AfterInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { DomainEvents } from '../../../../domain/events/DomainEvents.js';
import { UniqueEntityID } from '../../../../domain/UniqueEntityID.js';
import { OrderContactInfo } from './OrderContactInfo.js';
import { OrderItem } from './OrderItem.js';
import { User } from './User.js';

// firstName: string;
// lastName: string;
// email: string;
// phone: string;
// Pending Payment
// Confirmed - Awaiting shipment
// Shipped
// Cancelled
export type OrderStatusType = 'Pending' | 'Completed' | 'Cancelled';

@Entity('orders')
export class Order {
  @PrimaryColumn()
  id: string;

  @Column()
  total: number;

  @Column({
    // type: 'enum',
    // enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending',
  })
  status: OrderStatusType;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true, // When order is saved, linked orderItems will be saved as well
  })
  orderItems: Relation<OrderItem[]>;

  @OneToOne(() => OrderContactInfo, (contactInfo) => contactInfo.order)
  contactInfo: Relation<OrderContactInfo>;

  @ManyToOne(() => User, (user) => user.orders)
  user: Relation<User>;

  @AfterInsert()
  dispatchAggregateEvents() {
    const aggregateId = new UniqueEntityID(this.id);
    DomainEvents.dispatchEventsForAggregate(aggregateId);
  }
}
