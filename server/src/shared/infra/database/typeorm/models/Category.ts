import { Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { Product } from './Product.js';

@Entity('categories')
export class Category {
  @PrimaryColumn()
  id: string;

  @Column()
  slug: string;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Relation<Product[]>;
}
