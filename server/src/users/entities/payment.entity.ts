import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_payment' })
export class UserPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'payment_type' })
  paymentType: string;

  @Column()
  provider: string;

  @Column({ name: 'account_no' })
  accountNo: string;

  @Column()
  expiry: Date;

  @ManyToOne((type) => User, (user) => user.payments)
  user: User;
}
