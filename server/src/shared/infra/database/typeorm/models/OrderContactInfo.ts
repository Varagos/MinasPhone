import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Order } from './Order.js';

/**
 * I store customer information directly in the order rather than rely on the information in the customer record. That does a couple things:

I don't have to have a guest user in the customer database
If my customer information changes, or if a customer wants to ship one item to one place, and another item to another place the information about the order will still be correct.
I view order information as historical data. It should not change because something else in your database changes. For example if I order something from you, and at some later time I move and update my billing and shipping information, you should still know that the previous order was billed and shipped to the previous address. If you rely on the relationship between the customer and the order to retain bill to and ship to information, Once I move and update my profile, you think you shipped to my new address. You may not see that as an issue, but it will be.

You can still get the current information from the customer record to populate the fields on the order if the customer has an account. For a guest, he has to type it every time.
 */

@Entity('order_contact_info')
export class OrderContactInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToOne(() => Order, (order) => order.contactInfo)
  @JoinColumn({ name: 'order_id' })
  order: Relation<Order>;
}
