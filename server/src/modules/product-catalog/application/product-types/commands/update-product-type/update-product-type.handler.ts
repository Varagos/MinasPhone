import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { UpdateProductTypeCommand } from './update-product-type.command';
import { ProductTypeRepositoryPort } from '@modules/product-catalog/domain/ports/product-type.repository.port';
import { NotFoundException } from '@libs/exceptions';
import { ProductTypeEntity } from '@modules/product-catalog/domain/product-type.entity';
import { PRODUCT_TYPE_REPO } from '@modules/product-catalog/constants';
import { ProductTypeAttributeConfig } from '@modules/product-catalog/domain/value-objects/product-type-attribute-config.value-object';

export type UpdateProductTypeCommandResponse = Result<boolean, Error>;

@CommandHandler(UpdateProductTypeCommand)
export class UpdateProductTypeCommandHandler
  implements ICommandHandler<UpdateProductTypeCommand>
{
  constructor(
    @Inject(PRODUCT_TYPE_REPO)
    protected readonly repo: ProductTypeRepositoryPort,
  ) {}

  async execute(
    command: UpdateProductTypeCommand,
  ): Promise<UpdateProductTypeCommandResponse> {
    // Fetch existing entity
    const found = await this.repo.findOneById(command.productTypeId);

    if (found.isNone()) {
      return Err(new NotFoundException('Product type not found'));
    }

    const productType = found.unwrap();

    // Convert command attributes to value objects
    const attributes = command.attributes
      ? command.attributes.map((attr) =>
          ProductTypeAttributeConfig.create({
            // TODO add repo check for attributeIds, that they exist
            attributeId: attr.attributeId,
            isRequired: attr.config.isRequired,
            isFilterable: attr.config.isFilterable,
            isSearchable: attr.config.isSearchable,
            displayOrder: attr.config.displayOrder,
          }),
        )
      : undefined;

    // Perform updates based on command properties
    if (command.name) {
      const nameUpdateOrError = productType.updateName(command.name);
      if (nameUpdateOrError.isErr()) {
        return nameUpdateOrError;
      }
    }
    if (attributes) {
      // Maybe new attributes, maybe an attribute is removed, maybe an existing attribute is updated
      const attributesUpdateOrError = productType.updateAttributes(attributes);
      if (attributesUpdateOrError.isErr()) {
        return attributesUpdateOrError;
      }
    }

    const updatedEntity = new ProductTypeEntity({
      id: productType.id,
      createdAt: productType.createdAt,
      updatedAt: new Date(),
      props: {
        name: command.name || productType.name,
        attributes: attributes || productType.attributes,
      },
    });

    // Persist changes
    await this.repo.update(updatedEntity);

    return Ok(true);
  }
}
