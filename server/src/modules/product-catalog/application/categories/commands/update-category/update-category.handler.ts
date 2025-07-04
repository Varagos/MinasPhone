import {
  InternalServerErrorException,
  NotFoundException,
} from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { CATEGORY_REPO } from '@modules/product-catalog/constants';
import { CategoryRepositoryPort } from '@modules/product-catalog/domain/ports/category.repository.port';
import { UpdateCategoryCommand } from './update-category.command';
import { ForeignKeyIntegrityConstraintViolationError } from 'slonik';

export type UpdateCategoryCommandResponse = Result<
  void,
  NotFoundException | InternalServerErrorException
>;

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryCommandHandler {
  constructor(
    @Inject(CATEGORY_REPO)
    private readonly categoryRepo: CategoryRepositoryPort,
  ) {}

  async execute(
    command: UpdateCategoryCommand,
  ): Promise<UpdateCategoryCommandResponse> {
    // TODO return error if parentId is same as the current category id
    const found = await this.categoryRepo.findOneById(command.id);

    if (found.isNone()) {
      return Err(new NotFoundException());
    }
    const category = found.unwrap();

    if (command.slug !== undefined) {
      category.updateSlug(command.slug);
    }

    if (command.name !== undefined) {
      category.updateName(command.name);
    }

    if (command.parentId) {
      category.updateParentId(command.parentId);
    }

    try {
      await this.categoryRepo.update(category);
      return Ok(undefined);
    } catch (error) {
      if (error instanceof ForeignKeyIntegrityConstraintViolationError) {
        return Err(new NotFoundException('Parent category not found'));
      }
      return Err(new InternalServerErrorException());
    }
  }
}
