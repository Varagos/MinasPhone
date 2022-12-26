import { Result } from '../../../../shared/core/Result.js';

interface OrderDetailsProps {
  id: string;
  items: {
    productId: string;
    unitPrice: number;
    quantity: number;
  }[];

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

/**
 * @desc Read model for Category
 */

export class OrderDetails {
  props: OrderDetailsProps;

  private constructor(props: OrderDetailsProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get items() {
    return this.props.items;
  }

  public static create(props: OrderDetailsProps): Result<OrderDetails> {
    return Result.ok<OrderDetails>(new OrderDetails(props));
  }

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get email() {
    return this.props.email;
  }

  get phone() {
    return this.props.phone;
  }
}
