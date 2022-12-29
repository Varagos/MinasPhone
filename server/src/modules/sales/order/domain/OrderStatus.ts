import { Result } from '../../../../shared/core/Result.js';
import { ValueObject } from '../../../../shared/domain/ValueObject.js';
import {
  OrderStatusArr,
  OrderStatusType,
} from '../../../../shared/infra/database/typeorm/models/Order.js';

export type OrderStatusProps = {
  value: OrderStatusType;
};

export class OrderStatus extends ValueObject<OrderStatusProps> {
  private constructor(props: OrderStatusProps) {
    super(props);
  }

  static create(status: string): Result<OrderStatus> {
    if (!this.isValidStatus(status)) {
      return Result.fail<OrderStatus>('Invalid order status: ' + status);
    }

    return Result.ok(new OrderStatus({ value: status }));
  }

  static isValidStatus(status: string): status is OrderStatusType {
    return OrderStatusArr.includes(status as any);
  }

  get value(): OrderStatusType {
    return this.props.value;
  }
}
