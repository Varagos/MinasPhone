import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { CartItem } from './CartItem.js';
import { User } from './User.js';

@Entity('carts')
export class Cart {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: Relation<CartItem[]>;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn() // This is the owner of the relationship
  user: Relation<User>;
}
