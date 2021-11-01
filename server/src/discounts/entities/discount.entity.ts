import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ name: 'discount_percent' })
  discountPercent: number;

  @Column({})
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'modified_at' })
  modifiedAt: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  //   @DeleteDateColumn({ name: 'deleted_at' })
  //   deletedAt: Date;
}
