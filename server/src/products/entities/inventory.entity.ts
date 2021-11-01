import { Product } from './product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Inventory {
  // product_id FK in db (also PK)
  @OneToOne((type) => Product, { primary: true })
  @JoinColumn({ name: 'product_id' })
  productId: Product;

  @Column({ type: 'int' })
  quantity: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'modified_at', type: 'timestamp' })
  modifiedAt: Date;

  //   @DeleteDateColumn({ name: 'deleted_at' })
  //   deletedAt: Date;
}
