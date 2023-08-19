import { AggregateID, Entity } from '@libs/ddd/index.js';
import { randomUUID } from 'crypto';

export interface OrderLineItemProps {
  productId: string;
  quantity: number;
  itemPrice: number;
  totalPrice: number;
  productImage: string;
  productName: string;
}

export class OrderLineItemEntity extends Entity<OrderLineItemProps> {
  protected readonly _id: AggregateID;

  get id(): AggregateID {
    return this._id;
  }

  get productId(): string {
    return this.props.productId;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get itemPrice(): number {
    return this.props.itemPrice;
  }

  get totalPrice(): number {
    return this.props.totalPrice;
  }

  get productImage(): string {
    return this.props.productImage;
  }

  get productName(): string {
    return this.props.productName;
  }

  // TODO validations
  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }

  public static create(props: OrderLineItemProps): OrderLineItemEntity {
    const id = randomUUID();

    const defaultProps = {
      productId: props.productId,
      quantity: props.quantity,
      itemPrice: props.itemPrice,
      totalPrice: props.totalPrice,
      productImage: props.productImage,
      productName: props.productName,
    };
    const category = new OrderLineItemEntity({ props: defaultProps, id });

    return category;
  }
}
