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
import { ProductEntity } from '@modules/product-catalog/domain/product.entity';
import { ProductRepositoryPort } from '@modules/product-catalog/domain/ports/product.repository.port';
import { Image } from '@modules/product-catalog/domain/value-objects/image.value-object';
import { ProductAlreadyExistsError } from '@modules/product-catalog/domain/product.errors';
import { PRODUCT_REPO } from '@modules/product-catalog/constants';
import { ForeignKeyIntegrityConstraintViolationError } from 'slonik';

export type CreateProductCommandResponse = Result<
  AggregateID,
  ProductAlreadyExistsError | ArgumentInvalidException | NotFoundException
>;

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler implements ICommandHandler {
  constructor(
    @Inject(PRODUCT_REPO)
    protected readonly productRepo: ProductRepositoryPort,
  ) {}

  async execute(
    command: CreateProductCommand,
  ): Promise<CreateProductCommandResponse> {
    try {
      const product = ProductEntity.create({ ...command });

      /* Wrapping operation in a transaction to make sure
         that all domain events are processed atomically */
      await this.productRepo.transaction(async () =>
        this.productRepo.insert(product),
      );
      return Ok(product.id);
    } catch (error) {
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
}
