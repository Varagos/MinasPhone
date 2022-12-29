import { Result } from '../../../../../shared/core/Result.js';
import { AggregateRoot } from '../../../../../shared/domain/AggregateRoot.js';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID.js';
import { Money } from '../../../../common/primitives/Money.js';
import { Quantity } from '../../../../common/primitives/Quantity.js';
import { ProductId } from './ProductId.js';

interface CartItemProps {
  productId: ProductId;
  title: string;
  unitPrice: Money;
  quantity: Quantity;
  productMediaFileName: string;
}

export class CartItem extends AggregateRoot<CartItemProps> {
  private constructor(props: CartItemProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: CartItemProps,
    id?: UniqueEntityID,
  ): Result<CartItem> {
    // TODO validations

    const isNewCartItem = !!id === false;
    const defaultProps = {
      productId: props.productId,
      title: props.title,
      unitPrice: props.unitPrice,
      quantity: props.quantity,
      productMediaFileName: props.productMediaFileName,
    };
    const category = new CartItem(defaultProps, id);

    if (isNewCartItem) {
      // domain event
    }
    return Result.ok<CartItem>(category);
  }

  get productId(): ProductId {
    return this.props.productId;
  }

  get title(): string {
    return this.props.title;
  }

  get unitPrice(): Money {
    return this.props.unitPrice;
  }

  get quantity(): Quantity {
    return this.props.quantity;
  }

  get productMediaFileName(): string {
    return this.props.productMediaFileName;
  }

  public total(): Money {
    return this.props.unitPrice.multi(this.props.quantity.value);
  }

  public updateQuantity(quantity: Quantity): void {
    this.props.quantity = quantity;
  }
}
