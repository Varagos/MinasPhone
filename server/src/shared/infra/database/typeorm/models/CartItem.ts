import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import { Cart } from './Cart.js';
import { Product } from './Product.js';

@Entity('cart_items')
export class CartItem {
  @PrimaryColumn()
  id: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Relation<Product>;

  @ManyToOne(() => Cart, (cart) => cart.cartItems, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  cart: Relation<Cart>;
}
