import { Result } from '../../../../../shared/core/Result.js';
import { AggregateRoot } from '../../../../../shared/domain/AggregateRoot.js';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID.js';
import { Money } from '../../../../common/primitives/Money.js';
import { Quantity } from '../../../../common/primitives/Quantity.js';
import { ProductId } from './ProductId.js';

interface CartItemProps {
  productId: ProductId;
  quantity: Quantity;
  unitPrice: Money;
}

export class OrderItem extends AggregateRoot<CartItemProps> {
  private constructor(props: CartItemProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: CartItemProps,
    id?: UniqueEntityID,
  ): Result<OrderItem> {
    // TODO validations

    const isNewCartItem = !!id === false;
    const defaultProps = {
      productId: props.productId,
      quantity: props.quantity,
      unitPrice: props.unitPrice,
    };
    const category = new OrderItem(defaultProps, id);

    if (isNewCartItem) {
      // domain event
    }
    return Result.ok<OrderItem>(category);
  }

  get productId(): ProductId {
    return this.props.productId;
  }

  get quantity(): Quantity {
    return this.props.quantity;
  }

  get total(): Money {
    return this.props.unitPrice.multi(this.props.quantity.value);
  }
}
