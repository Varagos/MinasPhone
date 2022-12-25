import { Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { Product } from './Product.js';

@Entity('categories')
export class Category {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Relation<Product[]>;
}
