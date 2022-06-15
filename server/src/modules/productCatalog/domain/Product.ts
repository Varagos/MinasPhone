import { Result } from '../../../shared/core/Result';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';

interface ProductProps {
  active: boolean;
  permalink: string;
  name: string;
  description: string;
  quantity: number;
  media: string;
  sku: string;
  price: number;
}

export class Product extends AggregateRoot<ProductProps> {
  private constructor(props: ProductProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): any {
    return this._id;
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

  public static create(
    props: ProductProps,
    id?: UniqueEntityID,
  ): Result<Product> {
    // TODO validations

    const isNewProduct = !!id === false;
    const defaultProps = {
      active: props.active ?? true,
      permalink: props.permalink,
      name: props.name,
      description: props.description,
      quantity: props.quantity,
      media: props.media,
      sku: props.sku,
      price: props.price,
    };
    const product = new Product(defaultProps, id);

    if (isNewProduct) {
      // domain event
    }
    return Result.ok<Product>(product);
  }
}
