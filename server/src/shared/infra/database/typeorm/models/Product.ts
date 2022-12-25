import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { CartItem } from './CartItem.js';
import { Category } from './Category.js';
import { OrderItem } from './OrderItem.js';

@Entity('products')
export class Product {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  active: boolean;

  @Column()
  slug: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column({ name: 'media_filename' })
  mediaFilename: string;

  @Column()
  sku: string;

  @Column()
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Relation<Category>;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: Relation<OrderItem[]>;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: Relation<CartItem[]>;
}
