import { Result } from '../../../../shared/core/Result';
import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { Money } from '../../../common/primitives/Money';
import { OrderItem } from './item/OrderItem';

interface CartProps {
  items: OrderItem[];
}

export class Order extends AggregateRoot<CartProps> {
  private constructor(props: CartProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get categoryId(): any {
    return this._id;
  }

  get items(): OrderItem[] {
    return this.props.items;
  }

  public static create(props: CartProps, id?: UniqueEntityID): Result<Order> {
    // TODO validations

    const isNewOrder = !!id === false;
    const defaultProps = {
      items: props.items,
    };
    const order = new Order(defaultProps, id);

    if (isNewOrder) {
      // domain event
    }
    return Result.ok<Order>(order);
  }

  public total(): Money {
    return this.props.items.reduce(
      (total, item) => total.add(item.total),
      Money.ZERO,
    );
  }
}
