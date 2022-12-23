import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { OrderItem } from './OrderItem.js';
import { User } from './User.js';

@Entity('orders')
export class Order {
  @PrimaryColumn()
  id: string;

  @Column()
  total: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: Relation<OrderItem[]>;

  @ManyToOne(() => User, (user) => user.orders)
  user: Relation<User>;
}
