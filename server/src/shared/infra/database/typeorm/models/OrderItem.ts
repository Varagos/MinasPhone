import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import { Order } from './Order.js';
import { Product } from './Product.js';

@Entity('order_items')
export class OrderItem {
  @PrimaryColumn()
  id: string;

  @Column()
  quantity: number;

  @Column()
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
