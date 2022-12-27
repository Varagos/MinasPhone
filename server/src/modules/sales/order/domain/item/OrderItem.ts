import { Result } from '../../../../../shared/core/Result.js';
import { AggregateRoot } from '../../../../../shared/domain/AggregateRoot.js';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID.js';
import { Money } from '../../../../common/primitives/Money.js';
import { Quantity } from '../../../../common/primitives/Quantity.js';
import { ProductId } from './ProductId.js';

interface OrderItemProps {
  productId: ProductId;
  productName: string;
  quantity: Quantity;
  productMediaFileName: string;
  unitPrice: Money;
}

export class OrderItem extends AggregateRoot<OrderItemProps> {
  private constructor(props: OrderItemProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: OrderItemProps,
    id?: UniqueEntityID,
  ): Result<OrderItem> {
    // TODO validations

    const isNewCartItem = !!id === false;
    const defaultProps = {
      productId: props.productId,
      quantity: props.quantity,
      productName: props.productName,
      productMediaFileName: props.productMediaFileName,
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

  get productName(): string {
    return this.props.productName;
  }

  get productImage(): string {
    return this.props.productMediaFileName;
  }

  get unitPrice(): Money {
    return this.props.unitPrice;
  }

  get total(): Money {
    return this.props.unitPrice.multi(this.props.quantity.value);
  }
}
