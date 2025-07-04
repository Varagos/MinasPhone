import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ConflictException } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CreateCategoryCommand } from './create-category.command';
import { CategoryAlreadyExistsError } from '@modules/product-catalog/domain/category.errors';
import { CategoryRepositoryPort } from '@modules/product-catalog/domain/ports/category.repository.port';
import { CategoryEntity } from '@modules/product-catalog/domain/category.entity';
import { CATEGORY_REPO } from '@modules/product-catalog/constants';

export type CreateCategoryCommandResponse = Result<
  AggregateID,
  CategoryAlreadyExistsError
>;

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

    // TODO return error if parentId is same as the current category id

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
