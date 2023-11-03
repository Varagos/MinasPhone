import { AggregateID, Entity } from '@libs/ddd/index';
import { randomUUID } from 'crypto';

export interface CartLineItemProps {
  productId: string;
  quantity: number;
}

/**
 * Separating the lineItemId from the ProductId could be useful in the future
 * since we may allow to add the same product with different attributes,
 * e.g. size, color, etc.
 */
export class CartLineItemEntity extends Entity<CartLineItemProps> {
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

  // TODO validations
  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }

  public static create(props: CartLineItemProps): CartLineItemEntity {
    const id = randomUUID();

    const defaultProps = {
      productId: props.productId,
      quantity: props.quantity,
    };
    const category = new CartLineItemEntity({ props: defaultProps, id });

    return category;
  }

  public updateQuantity(quantity: number): void {
    this.props.quantity = quantity;
  }

  public increaseQuantity(): void {
    this.props.quantity++;
  }

  public decreaseQuantity(): void {
    this.props.quantity--;
  }
}
