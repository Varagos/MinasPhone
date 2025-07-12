import { AggregateID, AggregateRoot } from '@libs/ddd/index';
import { randomUUID } from 'crypto';
import { Image } from './value-objects/image.value-object';
import { customAlphabet } from 'nanoid';
import { ProductImageUpdatedDomainEvent } from './events/product-image-updated.domain-event';
import { ProductDeletedDomainEvent } from './events/product-deleted.domain-event';
import { Money } from './value-objects/money.value-object';
import { Err, Ok, Result } from 'oxide.ts';
import * as DomainErrors from './product.errors';

interface ProductProps {
  name: string;
  description: string;
  slug: string;
  price: Money;
  quantity: number;
  active: boolean;
  imageUri: string;
  sku: string | null;
  categoryId: string;
}
interface CreateProductProps {
  name: string;
  description: string;
  // slug: string;
  price: Money;
  quantity: number;
  active: boolean;
  imageUri: string;
  sku: string | null;
  categoryId: string;
}

export class ProductEntity extends AggregateRoot<ProductProps> {
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

  get imageUri(): string {
    return this.props.imageUri;
  }

  get sku(): string | null {
    return this.props.sku;
  }

  get price(): Money {
    return this.props.price;
  }

  get categoryId(): string {
    return this.props.categoryId;
  }

  // get mediaUrl(): string | undefined {
  //   return this.props.mediaUrl;
  // }

  public static create(props: CreateProductProps): ProductEntity {
    const id = randomUUID();
    const prefix = 'prod_';
    const length = 10;
    const slug =
      prefix +
      customAlphabet(
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        length,
      )();

    const defaultProps = {
      active: props.active ?? true,
      slug,
      name: props.name,
      description: props.description,
      quantity: props.quantity,
      imageUri: props.imageUri,
      sku: props.sku,
      price: props.price,
      categoryId: props.categoryId,
    };
    const product = new ProductEntity({ props: defaultProps, id });

    return product;
  }
  delete(): void {
    this.addEvent(
      new ProductDeletedDomainEvent({
        aggregateId: this.id,
        imageUri: this.props.imageUri,
      }),
    );
  }

  public updateName(name: string): void {
    this.props.name = name;
  }

  public updateDescription(description: string): void {
    this.props.description = description;
  }

  public updatePrice(price: Money): void {
    this.props.price = price;
  }

  public updateQuantity(quantity: number): void {
    this.props.quantity = quantity;
  }

  public updateActiveStatus(active: boolean): void {
    this.props.active = active;
  }

  public updateSku(sku: string): void {
    this.props.sku = sku;
  }

  public updateCategoryId(categoryId: string): void {
    this.props.categoryId = categoryId;
  }

  public updateImage(imageUri: string): void {
    this.addEvent(
      new ProductImageUpdatedDomainEvent({
        aggregateId: this.id,
        oldImageUri: this.props.imageUri,
      }),
    );
    this.props.imageUri = imageUri;
  }

  public reduceStock(
    quantity: number,
  ): Result<void, DomainErrors.InsufficientStockError> {
    // TODO Add domain event && domain rules
    if (this.props.quantity < quantity) {
      return Err(
        new DomainErrors.InsufficientStockError(
          this.id,
          this.props.name,
          quantity,
          this.props.quantity,
        ),
      );
    }
    this.props.quantity -= quantity;
    return Ok(undefined);
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
