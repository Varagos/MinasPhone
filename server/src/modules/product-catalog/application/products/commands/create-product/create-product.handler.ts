import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import {
  ArgumentInvalidException,
  ConflictException,
  NotFoundException,
} from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CreateProductCommand } from './create-product.command';
import {
  CreateProductProps,
  ProductAttributeValuesMap,
  ProductEntity,
} from '@modules/product-catalog/domain/product.entity';
import { ProductRepositoryPort } from '@modules/product-catalog/domain/ports/product.repository.port';
import { ProductAlreadyExistsError } from '@modules/product-catalog/domain/product.errors';
import {
  ATTRIBUTE_REPO,
  PRODUCT_REPO,
  PRODUCT_TYPE_REPO,
} from '@modules/product-catalog/constants';
import { ForeignKeyIntegrityConstraintViolationError } from 'slonik';
import { Money } from '@modules/product-catalog/domain/value-objects/money.value-object';
import { ProductAttributeValidatorDomainService } from '@modules/product-catalog/domain/services/product-attribute-validation.domain-service';
import { ProductAttributeValue } from '@modules/product-catalog/domain/value-objects/product-attribute-value.value-object';
import { ProductTypeRepositoryPort } from '@modules/product-catalog/domain/ports/product-type.repository.port';
import { AttributeRepositoryPort } from '@modules/product-catalog/domain/ports/attribute.repository.port';
import * as ProductDomainErrors from '@modules/product-catalog/domain/product.errors';
import * as ProductTypeDomainErrors from '@modules/product-catalog/domain/product-type.errors';
import * as AttributeDomainErrors from '@modules/product-catalog/domain/attribute.errors';

export type CreateProductCommandResponse = Result<
  AggregateID,
  | ProductAlreadyExistsError
  | ArgumentInvalidException
  | NotFoundException
  | ProductDomainErrors.ProductAttributeValueValidationError
  | ProductTypeDomainErrors.AttributeNotInProductTypeError
  | AttributeDomainErrors.AttributeValueValidationError
>;

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @Inject(PRODUCT_REPO)
    protected readonly productRepo: ProductRepositoryPort,
    @Inject(PRODUCT_TYPE_REPO)
    protected readonly productTypeRepo: ProductTypeRepositoryPort,
    @Inject(ATTRIBUTE_REPO)
    protected readonly attributeRepo: AttributeRepositoryPort,
  ) {}

  async execute(
    command: CreateProductCommand,
  ): Promise<CreateProductCommandResponse> {
    try {
      const price = Money.create(command.price);
      const props: CreateProductProps = {
        ...command,
        price,
        productAttributes: undefined,
      };

      if (command.productTypeId) {
        const productAttributeValuesMapOrErr =
          await this.validateProductTypeAttributes(
            command.productTypeId,
            command,
          );

        if (productAttributeValuesMapOrErr.isErr()) {
          return productAttributeValuesMapOrErr;
        }
        props.productAttributes = productAttributeValuesMapOrErr.unwrap();
      }

      const product = ProductEntity.create(props);

      /* Wrapping operation in a transaction to make sure
         that all domain events are processed atomically */

      await this.productRepo.insert(product);

      return Ok(product.id);
    } catch (error) {
      console.log('Error');
      if (error instanceof ArgumentInvalidException) {
        return Err(error);
      }

      if (error instanceof ConflictException) {
        return Err(new ProductAlreadyExistsError(error));
      }

      if (error instanceof ForeignKeyIntegrityConstraintViolationError) {
        return Err(
          new NotFoundException(
            `Category with id: {${command.categoryId}} not found`,
          ),
        );
      }
      // Handle invalid category-id foreign key exception

      throw error;
    }
  }

  private async validateProductTypeAttributes(
    productTypeId: AggregateID,
    command: CreateProductCommand,
  ): Promise<
    Result<
      ProductAttributeValuesMap,
      | ArgumentInvalidException
      | NotFoundException
      | ProductDomainErrors.ProductAttributeValueValidationError
      | ProductTypeDomainErrors.AttributeNotInProductTypeError
      | AttributeDomainErrors.AttributeValueValidationError

      // Err<ProductAttributeValueValidationError | AttributeNotInProductTypeError | AttributeValueValidationError
    >
  > {
    const productAttributeValuesMap: ProductAttributeValuesMap = new Map();
    for (const [attrId, attrValues] of Object.entries(
      command.attributeValues,
    )) {
      const attrValuesVOs: ProductAttributeValue[] = attrValues.map((val) =>
        ProductAttributeValue.create({
          valueId: val.valueId,
          textValue: val.textValue,
          numericValue: val.numericValue,
          booleanValue: val.booleanValue,
        }),
      );
      productAttributeValuesMap.set(attrId, attrValuesVOs);
    }

    const validator = new ProductAttributeValidatorDomainService();

    const productType = await this.productTypeRepo.findOneById(productTypeId);
    if (productType.isNone()) {
      return Err(
        new NotFoundException(
          `Product type with id: {${productTypeId}} not found`,
        ),
      );
    }
    const attributeIds = Array.from(productAttributeValuesMap.keys());
    const attributes = await this.attributeRepo.findManyByIds(attributeIds);

    if (attributes.length !== attributeIds.length) {
      return Err(
        new ArgumentInvalidException(
          'One or more attribute ids are invalid for the given product type, or they could not be found',
        ),
      );
    }
    // TODO validate all were fetched?

    const attributeValuesMapOrErr = validator.validateProductAttributes(
      productType.unwrap(),
      productAttributeValuesMap,
      attributes,
    );

    if (attributeValuesMapOrErr.isErr()) {
      return attributeValuesMapOrErr;
    }
    return Ok(attributeValuesMapOrErr.unwrap());
  }
}
