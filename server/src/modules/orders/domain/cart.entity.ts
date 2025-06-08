import { AggregateID, AggregateRoot } from '@libs/ddd/index';
import { randomUUID } from 'crypto';
import { CartLineItemEntity } from './cart-line-item.entity';
import { Err, Ok, Result } from 'oxide.ts';
import { LineItemNotFoundError } from './cart.errors';
import { CartPrimitives } from '../application/carts/commands/create-cart/create-cart.handler';
import { ProductModel } from '@modules/product-catalog/infra/database/product.repository';
import { ArgumentOutOfRangeException } from '@libs/exceptions';

interface CartProps {
  lineItems: CartLineItemEntity[];
}

interface CreateCartProps {
  lineItems?: CartLineItemEntity[];
}

export class CartEntity extends AggregateRoot<CartProps> {
  protected readonly _id: AggregateID;

  get id(): any {
    return this._id;
  }

  get lineItems(): CartLineItemEntity[] {
    return this.props.lineItems;
  }

  public static create(props: CreateCartProps, id?: AggregateID): CartEntity {
    // TODO validations

    const defaultProps = {
      lineItems: props.lineItems ?? [],
    };
    const order = new CartEntity({
      props: defaultProps,
      id: id ?? randomUUID(),
    });

    return order;
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }

  public addLineItem(
    lineItem: CartLineItemEntity,
    product: ProductModel,
  ): Result<void, ArgumentOutOfRangeException> {
    const existingProductQuantity = this.props.lineItems.reduce(
      (acc, lineItem) =>
        lineItem.productId === product.id ? acc + lineItem.quantity : acc,
      0,
    );
    // Temporary solution to prevent adding more items than available in stock
    // Perhaps if if we already have this line item in cart, we should just update it's quantity
    if (lineItem.quantity + existingProductQuantity > product.quantity) {
      return Err(
        new ArgumentOutOfRangeException(
          `Product with id {${product.id}} has only ${product.quantity} items in stock`,
        ),
      );
    }
    // If line item exists, we should update it's quantity
    const existingLineItem = this.props.lineItems.find(
      (item) => item.productId === lineItem.productId,
    );
    if (existingLineItem) {
      existingLineItem.updateQuantity(
        existingLineItem.quantity + lineItem.quantity,
      );
      return Ok(undefined);
    }

    this.props.lineItems.push(lineItem);
    return Ok(undefined);
  }

  public removeLineItem(lineItemId: string): void {
    this.props.lineItems = this.props.lineItems.filter(
      (lineItem) => lineItem.id !== lineItemId,
    );
  }

  public updateLineItemQuantity(
    lineItemId: string,
    quantity: number,
    product: ProductModel,
  ): Result<void, LineItemNotFoundError | ArgumentOutOfRangeException> {
    const lineItem = this.props.lineItems.find(
      (lineItem) => lineItem.id === lineItemId,
    );

    if (!lineItem) {
      return Err(new LineItemNotFoundError());
    }

    // Quantity here ideally needs also more complex validation
    if (quantity > product.quantity) {
      return Err(
        new ArgumentOutOfRangeException(
          `Product with id {${product.id}} has only ${product.quantity} items in stock`,
        ),
      );
    }

    lineItem.updateQuantity(quantity);
    return Ok(undefined);
  }

  public toPrimitives(): CartPrimitives {
    return {
      id: this.id,
      lineItems: this.lineItems.map((lineItem) => ({
        id: lineItem.id,
        productId: lineItem.productId,
        quantity: lineItem.quantity,
      })),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
