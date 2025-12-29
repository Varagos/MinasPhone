import { AggregateID, AggregateRoot } from '@libs/ddd/index';
import { randomUUID } from 'crypto';
import { Err, Ok, Result } from 'oxide.ts';
import { Guard } from '@libs/guard';
import * as ProductTypeErrors from './product-type.errors';
import { ProductTypeAttributeConfig } from './value-objects/product-type-attribute-config.value-object';
import { ProductTypeAttributeAddedDomainEvent } from './events/product-type-attribute-added.domain-event';
import { ProductTypeAttributeRemovedDomainEvent } from './events/product-type-attribute-removed.domain-event';
import { ProductTypeAttributeModifiedDomainEvent } from './events/product-type-attribute-modified.domain-event';

interface ProductTypeProps {
  name: string;
  attributes: ProductTypeAttributeConfig[];
}

interface CreateProductTypeProps {
  name: string;
  attributes: ProductTypeAttributeConfig[];
}

export class ProductTypeEntity extends AggregateRoot<ProductTypeProps> {
  public readonly _id: AggregateID;

  get id(): AggregateID {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get attributes(): ProductTypeAttributeConfig[] {
    return this.props.attributes;
  }

  public static create(
    props: CreateProductTypeProps,
  ): Result<
    ProductTypeEntity,
    | ProductTypeErrors.ProductTypeNameEmptyError
    | ProductTypeErrors.ProductTypeNameTooLongError
  > {
    const nameValidation = this.validateName(props.name);
    if (nameValidation.isErr()) {
      return nameValidation;
    }

    const id = randomUUID();
    const defaultProps: ProductTypeProps = {
      name: props.name,
      attributes: props.attributes,
    };
    const productType = new ProductTypeEntity({ props: defaultProps, id });

    return Ok(productType);
  }

  public delete() {
    // could throw domain event
  }

  public updateName(
    name: string,
  ): Result<
    void,
    | ProductTypeErrors.ProductTypeNameEmptyError
    | ProductTypeErrors.ProductTypeNameTooLongError
  > {
    const nameValidation = ProductTypeEntity.validateName(name);
    if (nameValidation.isErr()) {
      return nameValidation;
    }

    this.props.name = name;
    return Ok(void 0);
  }

  public updateAttributes(
    attributes: ProductTypeAttributeConfig[],
  ): Result<void, Error> {
    /**
     * Cases:
     * 1. New attribute - attribute ID exists in new list but not in current
     * 2. Attribute is removed - attribute ID exists in current list but not in new
     * 3. Attribute is updated - attribute ID exists in both lists but config changed
     *
     * (Or combination of the above)
     */

    const currentAttributesMap = new Map(
      this.props.attributes.map((attr) => [attr.attributeId, attr]),
    );
    const newAttributesMap = new Map(
      attributes.map((attr) => [attr.attributeId, attr]),
    );

    // Detect added attributes
    for (const [attributeId, newAttr] of newAttributesMap) {
      if (!currentAttributesMap.has(attributeId)) {
        this.addEvent(
          new ProductTypeAttributeAddedDomainEvent({
            aggregateId: this.id,
            attributeId,
          }),
        );
      }
    }

    // Detect removed attributes
    for (const [attributeId, oldAttr] of currentAttributesMap) {
      if (!newAttributesMap.has(attributeId)) {
        this.addEvent(
          new ProductTypeAttributeRemovedDomainEvent({
            aggregateId: this.id,
            attributeId,
          }),
        );
      }
    }

    // Detect modified attributes (using value object equals method)
    for (const [attributeId, newAttr] of newAttributesMap) {
      const oldAttr = currentAttributesMap.get(attributeId);
      if (oldAttr && !oldAttr.equals(newAttr)) {
        this.addEvent(
          new ProductTypeAttributeModifiedDomainEvent({
            aggregateId: this.id,
            attributeId,
            oldConfig: oldAttr,
            newConfig: newAttr,
          }),
        );
      }
    }

    // Update the attributes
    this.props.attributes = attributes;

    return Ok(void 0);
  }

  public getAttributeConfigById(
    attributeId: string,
  ): Result<
    ProductTypeAttributeConfig,
    ProductTypeErrors.AttributeNotInProductTypeError
  > {
    for (const attrConfig of this.props.attributes) {
      if (attrConfig.attributeId === attributeId) {
        return Ok(attrConfig);
      }
    }

    return Err(
      new ProductTypeErrors.AttributeNotInProductTypeError(
        attributeId,
        this.id,
      ),
    );
  }

  private static validateName(
    name: string,
  ): Result<
    void,
    | ProductTypeErrors.ProductTypeNameEmptyError
    | ProductTypeErrors.ProductTypeNameTooLongError
  > {
    if (Guard.isEmpty(name) || name.trim().length === 0) {
      return Err(new ProductTypeErrors.ProductTypeNameEmptyError());
    }

    if (!Guard.lengthIsBetween(name, 1, 255)) {
      return Err(new ProductTypeErrors.ProductTypeNameTooLongError());
    }

    return Ok(undefined);
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
