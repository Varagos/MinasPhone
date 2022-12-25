import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { CartItem } from './CartItem.js';
import { User } from './User.js';

@Entity('carts')
export class Cart {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    cascade: true, // When cart is saved, linked cartItems will be saved as well
  })
  cartItems: Relation<CartItem[]>;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn() // This is the owner of the relationship
  user: Relation<User>;
}
