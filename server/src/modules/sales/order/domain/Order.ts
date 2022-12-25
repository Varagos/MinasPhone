import { Result } from '../../../../shared/core/Result.js';
import { AggregateRoot } from '../../../../shared/domain/AggregateRoot.js';
import { NanoID } from '../../../../shared/domain/NanoID.js';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID.js';
import { OrderStatusType } from '../../../../shared/infra/database/typeorm/models/Order.js';
import { Money } from '../../../common/primitives/Money.js';
import { OrderContactInfo, OrderContactInfoProps } from './ContactInfo.js';
import { OrderCreatedEvent } from './events/OrderCreated.js';
import { OrderItem } from './item/OrderItem.js';

interface OrderCreateParams {
  items: OrderItem[];
  status?: OrderStatusType;
  contactInfo: OrderContactInfoProps;
}

// OrderStatusType
interface OrderProps {
  items: OrderItem[];
  status?: OrderStatusType;
  contactInfo: OrderContactInfo;
}

export class Order extends AggregateRoot<OrderProps> {
  private constructor(props: OrderProps, id?: NanoID) {
    super(props, id);
  }

  get categoryId(): any {
    return this._id;
  }

  get items(): OrderItem[] {
    return this.props.items;
  }

  get status(): OrderStatusType | undefined {
    return this.props.status;
  }

  get contactInfo(): OrderContactInfo {
    return this.props.contactInfo;
  }

  public static create(props: OrderCreateParams, id?: NanoID): Result<Order> {
    // TODO validations

    const contact = OrderContactInfo.create(props.contactInfo);
    const isNewOrder = !!id === false;
    const defaultProps: OrderProps = {
      items: props.items,
      status: props.status,
      contactInfo: contact.getValue(),
    };
    const order = new Order(defaultProps, id ?? new NanoID());

    if (isNewOrder) {
      // domain event
      order.addDomainEvent(new OrderCreatedEvent(order));
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
