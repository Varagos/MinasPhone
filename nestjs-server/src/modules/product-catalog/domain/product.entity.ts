import { AggregateID, AggregateRoot } from '@libs/ddd/index.js';
import { ArgumentOutOfRangeException } from '@libs/exceptions/exceptions.js';
import { randomUUID } from 'crypto';

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

  // mediaUrl?: string;
}
interface CreateProductProps {
  name: string;
  description: string;
  slug: string;
  price: number;
  quantity: number;
  active: boolean;
  mediaFileName: string;
  sku: string;
  categoryId: string;

  // mediaUrl?: string;
}

export class Product extends AggregateRoot<ProductProps> {
  public readonly _id: AggregateID;

  get id(): AggregateID {
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

  // get mediaUrl(): string | undefined {
  //   return this.props.mediaUrl;
  // }

  public static create(props: CreateProductProps): Product {
    const id = randomUUID();

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
    const product = new Product({ props: defaultProps, id });

    return product;
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
  validate(): void {
    // const guardArgs: IGuardArgument[] = [
    //   { argument: this.props.slug, argumentName: 'slug' },
    //   { argument: this.props.name, argumentName: 'name' },
    //   { argument: this.props.price, argumentName: 'price' },
    // ];
    // const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);
    // if (guardResult.isFailure) {
    //   throw new ArgumentOutOfRangeException(guardResult.getErrorValue());
    // }
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
