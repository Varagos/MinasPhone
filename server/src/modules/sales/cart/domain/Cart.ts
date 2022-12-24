import { Either, left, Result, right } from '../../../../shared/core/Result.js';
import { AggregateRoot } from '../../../../shared/domain/AggregateRoot.js';
import { Identifier } from '../../../../shared/domain/Identifier.js';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID.js';
import { Money } from '../../../common/primitives/Money.js';
import { Quantity } from '../../../common/primitives/Quantity.js';
import { Product } from '../../productCatalog/domain/Product.js';
import { CartItem } from './item/CartItem.js';
import { ProductId } from './item/ProductId.js';

interface CartProps {
  lineItems: CartItem[];
}

export class Cart extends AggregateRoot<CartProps> {
  private constructor(props: CartProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get categoryId(): any {
    return this._id;
  }

  get lineItems(): CartItem[] {
    return this.props.lineItems;
  }

  get hasItems(): boolean {
    return this.props.lineItems.length > 0;
  }

  public static create(props: CartProps, id?: UniqueEntityID): Result<Cart> {
    // TODO validations

    const isNewCart = !!id === false;
    const defaultProps = {
      lineItems: props.lineItems,
    };
    const cart = new Cart(defaultProps, id);

    if (isNewCart) {
      // domain event
    }
    return Result.ok<Cart>(cart);
  }

  public add(product: Product, quantity: number): Result<void> {
    const lineItemOrError = CartItem.create({
      productId: ProductId.create(product.id).getValue(),
      title: product.name,
      unitPrice: Money.create({ value: product.price }).getValue(),
      quantity: Quantity.create({ value: quantity }).getValue(),
    });
    if (lineItemOrError.isFailure) {
      return Result.fail(lineItemOrError.getErrorValue() as any);
    }
    const toAdd = lineItemOrError.getValue();

    const existingItem = this.props.lineItems.find(
      (item) => item.productId === toAdd.productId,
    );
    if (existingItem) {
      existingItem.quantity.add(toAdd.quantity);
    } else {
      this.props.lineItems.push(toAdd);
    }
    return Result.ok<void>();
  }

  public remove(
    lineItemId: UniqueEntityID,
  ): Either<Result<string>, Result<void>> {
    const exists = this.props.lineItems.some((item) =>
      item.id.equals(lineItemId),
    );
    if (!exists) {
      return left(Result.fail('Line item not found'));
    }

    this.props.lineItems = this.props.lineItems.filter(
      (item) => !item.id.equals(lineItemId),
    );
    return right(Result.ok());
  }

  public updateQuantity(
    lineItemId: UniqueEntityID,
    quantity: number,
  ): Either<Result<string>, Result<void>> {
    if (quantity < 1) {
      return left(Result.fail('Quantity must be greater than zero'));
    }

    if (quantity === 0) {
      return this.remove(lineItemId);
    }

    const lineItem = this.props.lineItems.find((item) =>
      item.id.equals(lineItemId),
    );

    if (!lineItem) {
      return left(Result.fail('Line item not found'));
    }

    lineItem.updateQuantity(Quantity.create({ value: quantity }).getValue());
    return right(Result.ok());
  }

  public empty(): void {
    this.props.lineItems = [];
  }
}
