import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ConflictException } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CreateCategoryCommand } from './create-category.command.js';
import { CATEGORY_REPO } from '@modules/product-catalog/contants.js';
import { CategoryAlreadyExistsError } from '@modules/product-catalog/domain/category.errors.js';
import { CategoryRepositoryPort } from '@modules/product-catalog/domain/ports/category.repository.port.js';
import { CategoryEntity } from '@modules/product-catalog/domain/category.entity.js';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryCommandHandler implements ICommandHandler {
  constructor(
    @Inject(CATEGORY_REPO)
    protected readonly categoryRepo: CategoryRepositoryPort,
  ) {}

  async execute(
    command: CreateCategoryCommand,
  ): Promise<Result<AggregateID, CategoryAlreadyExistsError>> {
    const category = CategoryEntity.create(command);

    try {
      /* Wrapping operation in a transaction to make sure
         that all domain events are processed atomically */
      await this.categoryRepo.transaction(async () =>
        this.categoryRepo.insert(category),
      );
      return Ok(category.id);
    } catch (error: any) {
      if (error instanceof ConflictException) {
        return Err(new CategoryAlreadyExistsError(error));
      }
      throw error;
    }
  }
}
