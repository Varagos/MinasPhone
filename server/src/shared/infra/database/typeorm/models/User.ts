import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { Cart } from './Cart.js';
import { Order } from './Order.js';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'joined_at' })
  joinedAt: number;

  @OneToMany(() => Order, (order) => order.user)
  orders: Relation<Order[]>;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Relation<Cart>;
}
