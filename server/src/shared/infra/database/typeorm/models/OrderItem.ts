import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import { Order } from './Order.js';
import { Product } from './Product.js';

@Entity('order_items')
export class OrderItem {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @ManyToOne(() => Product, (product) => product.orderItems, {
    onDelete: 'NO ACTION',
  })
  product: Relation<Product>;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    onDelete: 'CASCADE',
  })
  order: Relation<Order>;
}
