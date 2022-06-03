import { Result } from '../../../shared/core/Result';

interface ProductDetailsProps {
  id: string;
  active: boolean;
  permalink: string;
  name: string;
  description: string;
  quantity: number;
  media: string;
  sku: string;
  price: number;
}

/**
 * @desc Read model for Product
 */

export class ProductDetails {
  props: ProductDetailsProps;

  private constructor(props: ProductDetailsProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get active(): boolean {
    return this.props.active;
  }
  get name(): string {
    return this.props.name;
  }

  get permalink(): string {
    return this.props.permalink;
  }

  get description(): string {
    return this.props.description;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get media(): string {
    return this.props.media;
  }

  get sku(): string {
    return this.props.sku;
  }

  get price(): number {
    return this.props.price;
  }

  public static create(props: ProductDetailsProps): Result<ProductDetails> {
    return Result.ok<ProductDetails>(new ProductDetails(props));
  }
}
