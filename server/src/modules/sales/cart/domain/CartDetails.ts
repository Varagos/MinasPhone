import { Result } from '../../../../shared/core/Result.js';

interface CategoryDetailsProps {
  id: string;
  lineItems: {
    productId: string;
    title: string;
    unitPrice: number;
    quantity: number;
  }[];
  createdAt?: number;
  updatedAt?: number;
}

/**
 * @desc Read model for Category
 */

export class CartDetails {
  props: CategoryDetailsProps;

  private constructor(props: CategoryDetailsProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get items() {
    return this.props.lineItems;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  public static create(props: CategoryDetailsProps): Result<CartDetails> {
    return Result.ok<CartDetails>(new CartDetails(props));
  }
}
