import { Discount } from './../../discounts/entities/discount.entity';
import { Category } from './../../categories/entities/category.entity';
import { Inventory } from './inventory.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  desc: string;

  @Column({ type: 'varchar' })
  SKU: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToOne((type) => Inventory)
  inventory: Inventory; // no field in db

  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(() => Discount, (discount) => discount.products)
  @JoinColumn({ name: 'discount_id' })
  discount: Category;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'timestamp' })
  modifiedAt: Date;

  // https://typeorm.io/#/entities/special-columns
  //   @DeleteDateColumn({ name: 'deleted_at' })
  //   deletedAt: Date;
}
