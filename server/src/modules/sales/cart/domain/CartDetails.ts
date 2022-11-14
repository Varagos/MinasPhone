import { Result } from '@shared/core/Result';

interface CategoryDetailsProps {
  id: string;
  lineItems: {
    productId: string;
    title: string;
    unitPrice: number;
    quantity: number;
  }[];
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

  public static create(props: CategoryDetailsProps): Result<CartDetails> {
    return Result.ok<CartDetails>(new CartDetails(props));
  }
}
