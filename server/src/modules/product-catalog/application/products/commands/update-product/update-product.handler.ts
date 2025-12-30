import {
  ArgumentInvalidException,
  InternalServerErrorException,
  NotFoundException,
} from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import {
  ATTRIBUTE_REPO,
  PRODUCT_REPO,
  PRODUCT_TYPE_REPO,
} from '@modules/product-catalog/constants';
import { UpdateProductCommand } from './update-product.command';
import { ForeignKeyIntegrityConstraintViolationError } from 'slonik';
import { ProductRepositoryPort } from '@modules/product-catalog/domain/ports/product.repository.port';
import { Money } from '@modules/product-catalog/domain/value-objects/money.value-object';
import { AggregateID } from '@libs/ddd';
import { ProductAttributeValuesMap } from '@modules/product-catalog/domain/product.entity';
import { ProductAttributeValue } from '@modules/product-catalog/domain/value-objects/product-attribute-value.value-object';
import { ProductAttributeValidatorDomainService } from '@modules/product-catalog/domain/services/product-attribute-validation.domain-service';
import { ProductTypeRepositoryPort } from '@modules/product-catalog/domain/ports/product-type.repository.port';
import { AttributeRepositoryPort } from '@modules/product-catalog/domain/ports/attribute.repository.port';
import * as ProductDomainErrors from '@modules/product-catalog/domain/product.errors';
import * as ProductTypeDomainErrors from '@modules/product-catalog/domain/product-type.errors';
import * as AttributeDomainErrors from '@modules/product-catalog/domain/attribute.errors';

export type UpdateProductCommandResponse = Result<
  void,
  | NotFoundException
  | InternalServerErrorException
  | ArgumentInvalidException
  | ProductDomainErrors.ProductAttributeValueValidationError
  | ProductTypeDomainErrors.AttributeNotInProductTypeError
  | AttributeDomainErrors.AttributeValueValidationError
>;

@CommandHandler(UpdateProductCommand)
export class UpdateProductCommandHandler {
  constructor(
    @Inject(PRODUCT_REPO) private readonly productRepo: ProductRepositoryPort,
    @Inject(PRODUCT_TYPE_REPO)
    private readonly productTypeRepo: ProductTypeRepositoryPort,
    @Inject(ATTRIBUTE_REPO)
    private readonly attributeRepo: AttributeRepositoryPort,
  ) {}

  async execute(
    command: UpdateProductCommand,
  ): Promise<UpdateProductCommandResponse> {
    try {
      const found = await this.productRepo.findOneById(command.id);

      if (found.isNone()) {
        return Err(new NotFoundException());
      }
      const product = found.unwrap();

      if (command.name !== undefined) {
        product.updateName(command.name);
      }

      if (command.description !== undefined) {
        product.updateDescription(command.description);
      }

      if (command.price !== undefined) {
        const price = Money.create(command.price);
        product.updatePrice(price);
      }

      if (command.quantity !== undefined) {
        product.updateQuantity(command.quantity);
      }

      if (command.active !== undefined) {
        product.updateActiveStatus(command.active);
      }

      if (command.categoryId) {
        product.updateCategoryId(command.categoryId);
      }

      if (command.imageUri) {
        product.updateImage(command.imageUri);
      }
      if (command.productTypeId !== undefined) {
        product.updateProductTypeId(command.productTypeId);
      }

      // Handle attribute values update
      if (command.attributeValues !== undefined) {
        const productTypeId = command.productTypeId ?? product.productTypeId;

        if (productTypeId) {
          const productAttributeValuesMapOrErr =
            await this.validateProductTypeAttributes(
              productTypeId,
              command.attributeValues,
            );

          if (productAttributeValuesMapOrErr.isErr()) {
            return productAttributeValuesMapOrErr;
          }
          product.updateProductAttributes(
            productAttributeValuesMapOrErr.unwrap(),
          );
        } else {
          // If no product type, clear attributes
          product.updateProductAttributes(undefined);
        }
      }

      await this.productRepo.update(product);
      return Ok(undefined);
    } catch (error) {
      if (error instanceof ForeignKeyIntegrityConstraintViolationError) {
        return Err(
          new NotFoundException(`Category not found: ${command.categoryId} `),
        );
      }
      console.error(error);
      return Err(new InternalServerErrorException());
    }
  }

  private async validateProductTypeAttributes(
    productTypeId: AggregateID,
    attributeValues: Record<
      string,
      {
        valueId: string | null;
        textValue: string | null;
        numericValue: number | null;
        booleanValue: boolean | null;
      }[]
    >,
  ): Promise<
    Result<
      ProductAttributeValuesMap,
      | ArgumentInvalidException
      | NotFoundException
      | ProductDomainErrors.ProductAttributeValueValidationError
      | ProductTypeDomainErrors.AttributeNotInProductTypeError
      | AttributeDomainErrors.AttributeValueValidationError
    >
  > {
    const productAttributeValuesMap: ProductAttributeValuesMap = new Map();
    for (const [attrId, attrValues] of Object.entries(attributeValues)) {
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
