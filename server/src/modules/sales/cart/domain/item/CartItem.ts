import { Result } from '../../../../../shared/core/Result';
import { AggregateRoot } from '../../../../../shared/domain/AggregateRoot';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { Money } from '../../../../common/primitives/Money';
import { Quantity } from '../../../../common/primitives/Quantity';
import { ProductId } from './ProductId';

interface CartItemProps {
  productId: ProductId;
  title: string;
  unitPrice: Money;
  quantity: Quantity;
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

  public total(): Money {
    return this.props.unitPrice.multi(this.props.quantity.value);
  }
}
