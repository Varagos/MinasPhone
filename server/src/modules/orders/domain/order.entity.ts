import { AggregateID, AggregateRoot } from '@libs/ddd/index';
import { randomUUID } from 'crypto';
import { ContactInfo } from './value-objects/contact-info.value-object';
import { customAlphabet } from 'nanoid';
import { OrderLineItemEntity } from './order-line-item.entity';
import Decimal from 'decimal.js';
import { OrderCancelledDomainEvent } from './events/order-cancelled.domain-event';
import { InvalidOrderStatusError } from './order.errors';
import { Err, Ok, Result } from 'oxide.ts';
import { OrderConfirmedDomainEvent } from './events/order-confirmed.domain-event';
import { OrderCreationStartedDomainEvent } from './events/order-creation-started.domain-event';

export enum OrderStatus {
  Pending = 'pending',
  // Paid = 'paid',
  // Shipped = 'shipped',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
  Confirmed = 'confirmed',
  // Failed = 'failed',
}

interface OrderProps {
  lineItems: OrderLineItemEntity[];
  status: OrderStatus;
  contactInfo: ContactInfo;
  slug: string;
  total: number;
}
interface CreateOrderProps {
  lineItems: OrderLineItemEntity[];
  contactInfo: ContactInfo;
}

export class OrderEntity extends AggregateRoot<OrderProps> {
  public readonly _id: AggregateID;

  get id(): AggregateID {
    return this._id;
  }

  get lineItems(): OrderLineItemEntity[] {
    return this.props.lineItems;
  }

  get status(): string {
    return this.props.status;
  }

  get contactInfo(): ContactInfo {
    return this.props.contactInfo;
  }

  get slug(): string {
    return this.props.slug;
  }

  public static create(props: CreateOrderProps): OrderEntity {
    const id = randomUUID();
    console.log('order id', id);
    const slug = OrderEntity.generateSlug();

    const total = props.lineItems
      .reduce(
        (acc, item) => new Decimal(item.totalPrice).plus(acc),
        new Decimal(0),
      )
      .toNumber();

    const defaultProps: OrderProps = {
      lineItems: props.lineItems,
      status: OrderStatus.Pending,
      contactInfo: props.contactInfo,
      slug,
      total,
    };
    const order = new OrderEntity({ props: defaultProps, id });

    order.addEvent(
      new OrderCreationStartedDomainEvent({
        aggregateId: id,
        lineItems: props.lineItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      }),
    );

    return order;
  }

  public updateStatus(status: string): Result<void, InvalidOrderStatusError> {
    if (!this.isOrderStatus(status)) {
      return Err(new InvalidOrderStatusError(status));
    }

    if (status === OrderStatus.Cancelled) {
      this.cancel();
    } else if (status === OrderStatus.Confirmed) {
      this.confirm();
    }
    this.props.status = status;
    return Ok(undefined);
  }

  public confirm(): void {
    this.props.status = OrderStatus.Confirmed;
    this.addEvent(
      new OrderConfirmedDomainEvent({
        aggregateId: this.id,
        lineItems: this.lineItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          itemPrice: item.itemPrice,
          totalPrice: item.totalPrice,
          productImage: item.productImage,
          productName: item.productName,
        })),
      }),
    );
  }

  private isOrderStatus(value: string): value is OrderStatus {
    return Object.values(OrderStatus).includes(value as OrderStatus);
  }

  public updateSlug(): void {
    this.props.slug = OrderEntity.generateSlug();
  }

  public delete(): void {
    // TODO
  }

  public cancel(): void {
    this.props.status = OrderStatus.Cancelled;
    this.addEvent(
      new OrderCancelledDomainEvent({
        aggregateId: this.id,
        lineItems: this.lineItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      }),
    );
  }

  private static generateSlug(): string {
    // TODO handle collisions
    return customAlphabet('0123456789', 8)();
  }

  validate(): void {
    // const guardArgs: IGuardArgument[] = [
    //   { argument: this.props.slug, argumentName: 'slug' },
    //   { argument: this.props.name, argumentName: 'name' },
    //   { argument: this.props.price, argumentName: 'price' },
    // ];
    // const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);
    // if (guardResult.isFailure) {
    //   throw new ArgumentOutOfRangeException(guardResult.getErrorValue());
    // }
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
