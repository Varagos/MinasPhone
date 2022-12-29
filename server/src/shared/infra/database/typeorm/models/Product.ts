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
  slug: string;

  @Column()
  active: boolean;

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

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  category: Relation<Category>;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: Relation<OrderItem[]>;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: Relation<CartItem[]>;
}
