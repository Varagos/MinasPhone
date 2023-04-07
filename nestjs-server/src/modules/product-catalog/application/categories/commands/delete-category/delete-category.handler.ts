import { NotFoundException } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { CATEGORY_REPO } from '@modules/product-catalog/contants.js';
import { CategoryRepositoryPort } from '@modules/product-catalog/domain/ports/category.repository.port.js';
import { DeleteCategoryCommand } from './delete-category.command';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryCommandHandler {
  constructor(
    @Inject(CATEGORY_REPO)
    private readonly categoryRepo: CategoryRepositoryPort,
  ) {}

  async execute(
    command: DeleteCategoryCommand,
  ): Promise<Result<boolean, NotFoundException>> {
    const found = await this.categoryRepo.findOneById(command.id);
    if (found.isNone()) return Err(new NotFoundException());
    const category = found.unwrap();
    category.delete();
    const result = await this.categoryRepo.delete(category);
    return Ok(result);
  }
}
