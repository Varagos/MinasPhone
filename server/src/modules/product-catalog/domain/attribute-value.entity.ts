import { AggregateID, AggregateRoot, Entity } from '@libs/ddd/index';
import { randomUUID } from 'crypto';
import { Image } from './value-objects/image.value-object';
import { customAlphabet } from 'nanoid';
import { ProductImageUpdatedDomainEvent } from './events/product-image-updated.domain-event';
import { ProductDeletedDomainEvent } from './events/product-deleted.domain-event';
import { Money } from './value-objects/money.value-object';
import { Err, Ok, Result } from 'oxide.ts';
import * as DomainErrors from './product.errors';

interface AttributeValueProps {
  value: string;
  displayOrder: number;
}

export interface CreateAttributeValueProps {
  value: string;
  displayOrder: number;
}

export class AttributeValueEntity extends Entity<AttributeValueProps> {
  public readonly _id: AggregateID;

  get id(): AggregateID {
    return this._id;
  }

  get value(): string {
    return this.props.value;
  }

  get displayOrder(): number {
    return this.props.displayOrder;
  }

  public static create(props: CreateAttributeValueProps): AttributeValueEntity {
    const id = randomUUID();
    const defaultProps: AttributeValueProps = {
      value: props.value,
      displayOrder: props.displayOrder,
    };
    const attributeValue = new AttributeValueEntity({
      props: defaultProps,
      id,
    });

    return attributeValue;
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
