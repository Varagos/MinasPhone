import { Ok, Result } from 'oxide.ts';
import { ProductTypeEntity } from '../product-type.entity';
import { ProductAttributeValue } from '../value-objects/product-attribute-value.value-object';
import * as DomainErrors from '../product.errors';
import * as ProductTypeDomainErrors from '../product-type.errors';
import * as AttributeDomainErrors from '../attribute.errors';
import { AggregateID } from '@libs/ddd';
import { AttributeEntity } from '../attribute.entity';

export class ProductAttributeValidatorDomainService {
  public validateProductAttributes(
    productType: ProductTypeEntity,
    attributeValues: Map<AggregateID, ProductAttributeValue[]>,
    attributes: AttributeEntity[],
  ): Result<
    Map<string, ProductAttributeValue[]>,
    | DomainErrors.ProductAttributeValueValidationError
    | ProductTypeDomainErrors.AttributeNotInProductTypeError
    | AttributeDomainErrors.AttributeValueValidationError
  > {
    const map = new Map<string, ProductAttributeValue[]>();
    // We need to ensure attributesValues conform with type of product type

    const attributesById = new Map<string, AttributeEntity>();
    for (const attr of attributes) {
      attributesById.set(attr.id.toString(), attr);
    }

    for (const [attributeId, attributeValue] of attributeValues.entries()) {
      const attributeConfigOrErr =
        productType.getAttributeConfigById(attributeId);

      if (attributeConfigOrErr.isErr()) {
        return attributeConfigOrErr;
      }

      //   Validate it conforms
      const attributeConfig = attributeConfigOrErr.unwrap();
      // we could check if required attributes are present too
      const attributeEntity = attributesById.get(attributeId);
      if (!attributeEntity) {
        // This should not happen if, application service should have found this attribute
        throw new Error('Attribute entity not found for given id');
      }

      const attributeValueValidation =
        attributeEntity.productValueConforms(attributeValue);
      if (attributeValueValidation.isErr()) {
        return attributeValueValidation;
      }
      map.set(attributeId, attributeValue);
    }

    return Ok(map);
  }
}
