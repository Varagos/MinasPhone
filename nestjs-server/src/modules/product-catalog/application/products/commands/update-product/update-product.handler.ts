import {
  InternalServerErrorException,
  NotFoundException,
} from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { PRODUCT_REPO } from '@modules/product-catalog/constants';
import { UpdateProductCommand } from './update-product.command';
import { ForeignKeyIntegrityConstraintViolationError } from 'slonik';
import { ProductRepositoryPort } from '@modules/product-catalog/domain/ports/product.repository.port';

export type UpdateProductCommandResponse = Result<
  void,
  NotFoundException | InternalServerErrorException
>;

@CommandHandler(UpdateProductCommand)
export class UpdateProductCommandHandler {
  constructor(
    @Inject(PRODUCT_REPO) private readonly productRepo: ProductRepositoryPort,
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
        product.updatePrice(command.price);
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
}
