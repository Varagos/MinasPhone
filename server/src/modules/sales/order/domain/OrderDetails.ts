import { Result } from '../../../../shared/core/Result.js';

interface OrderDetailsProps {
  items: {
    productId: string;
    unitPrice: number;
    quantity: number;
  }[];
}

/**
 * @desc Read model for Category
 */

export class OrderDetails {
  props: OrderDetailsProps;

  private constructor(props: OrderDetailsProps) {
    this.props = props;
  }

  get items() {
    return this.props.items;
  }

  public static create(props: OrderDetailsProps): Result<OrderDetails> {
    return Result.ok<OrderDetails>(new OrderDetails(props));
  }
}
