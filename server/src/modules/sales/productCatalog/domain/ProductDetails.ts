import { Result } from '@shared/core/Result';

interface ProductDetailsProps {
  id: string;
  active: boolean;
  slug: string;
  name: string;
  description: string;
  quantity: number;
  mediaFileName: string;
  sku: string;
  price: number;
  categoryId: string;
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

  get slug(): string {
    return this.props.slug;
  }

  get description(): string {
    return this.props.description;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get mediaFileName(): string {
    return this.props.mediaFileName;
  }

  get sku(): string {
    return this.props.sku;
  }

  get price(): number {
    return this.props.price;
  }

  get categoryId(): string {
    return this.props.categoryId;
  }

  public static create(props: ProductDetailsProps): Result<ProductDetails> {
    return Result.ok<ProductDetails>(new ProductDetails(props));
  }
}
