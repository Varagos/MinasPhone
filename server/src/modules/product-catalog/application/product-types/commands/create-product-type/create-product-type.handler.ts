import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ConflictException } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CreateProductTypeCommand } from './create-product-type.command';
import * as ProductTypeErrors from '@modules/product-catalog/domain/product-type.errors';
import { PRODUCT_TYPE_REPO } from '@modules/product-catalog/constants';
import { ProductTypeEntity } from '@modules/product-catalog/domain/product-type.entity';
import { ProductTypeRepositoryPort } from '@modules/product-catalog/domain/ports/product-type.repository.port';
import { ProductTypeAttributeConfig } from '@modules/product-catalog/domain/value-objects/product-type-attribute-config.value-object';

export type CreateProductTypeCommandResponse = Result<
  AggregateID,
  | ProductTypeErrors.ProductTypeAlreadyExistsError
  | ProductTypeErrors.ProductTypeNameEmptyError
  | ProductTypeErrors.ProductTypeNameTooLongError
>;

@CommandHandler(CreateProductTypeCommand)
export class CreateProductTypeCommandHandler
  implements ICommandHandler<CreateProductTypeCommand>
{
  constructor(
    @Inject(PRODUCT_TYPE_REPO)
    protected readonly productTypeRepo: ProductTypeRepositoryPort,
  ) {}

  async execute(
    command: CreateProductTypeCommand,
  ): Promise<CreateProductTypeCommandResponse> {
    try {
      // Convert command attributes to value objects
      const attributes = command.attributes.map((attr) =>
        ProductTypeAttributeConfig.create({
          // TODO add repo check for attributeIds, that they exist
          attributeId: attr.attributeId,
          isRequired: attr.config.isRequired,
          isFilterable: attr.config.isFilterable,
          isSearchable: attr.config.isSearchable,
          displayOrder: attr.config.displayOrder,
        }),
      );

      const productTypeResult = ProductTypeEntity.create({
        name: command.name,
        attributes: attributes,
      });

      if (productTypeResult.isErr()) {
        return Err(productTypeResult.unwrapErr());
      }

      const productType = productTypeResult.unwrap();

      /* Wrapping operation in a transaction to make sure
         that all domain events are processed atomically */
      await this.productTypeRepo.insert(productType);

      return Ok(productType.id);
    } catch (error) {
      if (error instanceof ConflictException) {
        return Err(new ProductTypeErrors.ProductTypeAlreadyExistsError(error));
      }

      throw error;
    }
  }
}
