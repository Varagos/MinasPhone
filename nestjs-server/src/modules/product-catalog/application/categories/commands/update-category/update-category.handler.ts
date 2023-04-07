import { NotFoundException } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { CATEGORY_REPO } from '@modules/product-catalog/constants';
import { CategoryRepositoryPort } from '@modules/product-catalog/domain/ports/category.repository.port';
import { UpdateCategoryCommand } from './update-category.command';

@CommandHandler(UpdateCategoryCommand)
export class DeleteCategoryCommandHandler {
  constructor(
    @Inject(CATEGORY_REPO)
    private readonly categoryRepo: CategoryRepositoryPort,
  ) {}

  async execute(
    command: UpdateCategoryCommand,
  ): Promise<Result<void, NotFoundException>> {
    const found = await this.categoryRepo.findOneById(command.id);

    if (found.isNone()) {
      return Err(new NotFoundException());
    }
    const category = found.unwrap();

    if (command.name !== undefined) {
      category.updateName(command.name);
    }

    if (command.parentId !== undefined) {
      category.updateParentId(command.parentId);
    }

    await this.categoryRepo.update(category);
    return Ok(undefined);
  }
}
