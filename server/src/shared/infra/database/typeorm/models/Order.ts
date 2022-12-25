import {
  AfterInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { DomainEvents } from '../../../../domain/events/DomainEvents.js';
import { NanoID } from '../../../../domain/NanoID.js';
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
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({
    unique: true,
  })
  id: string;

  @Column()
  total: number;

  @Column({
    // type: 'enum',
    // enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending',
  })
  status: OrderStatusType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

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
    const aggregateId = new NanoID(this.id);
    DomainEvents.dispatchEventsForAggregate(aggregateId);
  }
}
