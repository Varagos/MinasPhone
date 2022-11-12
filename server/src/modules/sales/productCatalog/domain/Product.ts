import { Guard, IGuardArgument } from '../../../../shared/core/Guard';
import { Result } from '../../../../shared/core/Result';
import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';

interface ProductProps {
  name: string;
  description: string;
  slug: string;
  price: number;
  quantity: number;
  active: boolean;
  mediaFileName: string;
  sku: string;
  categoryId: string;
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

  public static create(
    props: ProductProps,
    id?: UniqueEntityID,
  ): Result<Product> {
    const guardArgs: IGuardArgument[] = [
      { argument: props.slug, argumentName: 'slug' },
      { argument: props.name, argumentName: 'name' },
      { argument: props.price, argumentName: 'price' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);
    if (guardResult.isFailure) {
      return Result.fail<Product>(guardResult.getErrorValue());
    }

    const isNewProduct = !!id === false;
    const defaultProps = {
      active: props.active ?? true,
      slug: props.slug,
      name: props.name,
      description: props.description,
      quantity: props.quantity,
      mediaFileName: props.mediaFileName,
      sku: props.sku,
      price: props.price,
      categoryId: props.categoryId,
    };
    const product = new Product(defaultProps, id);

    if (isNewProduct) {
      // domain event
    }
    return Result.ok<Product>(product);
  }

  updateProps(props: Partial<ProductProps>): Result<void> {
    const propsWithValues = this.removeUndefinedProps(props);
    // TODO Validate props

    for (const [key, value] of Object.entries(propsWithValues)) {
      const typedKey = key as keyof ProductProps;
      (this.props as any)[typedKey] = value;
    }
    // console.log('this.props', this.props);

    return Result.ok<void>();
  }

  private removeUndefinedProps(
    props: Record<string, unknown>,
  ): Partial<ProductProps> {
    const propsCopy = { ...props };
    for (const propName in propsCopy) {
      if (props[propName] === undefined) {
        delete props[propName];
      }
    }
    return propsCopy;
  }
}
