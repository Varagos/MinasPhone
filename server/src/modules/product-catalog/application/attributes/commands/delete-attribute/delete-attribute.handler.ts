import { NotFoundException } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { ATTRIBUTE_REPO } from '@modules/product-catalog/constants';
import { DeleteAttributeCommand } from './delete-attribute.command';
import { AttributeRepositoryPort } from '@modules/product-catalog/domain/ports/attribute.repository.port';

export type DeleteAttributeCommandResponse = Result<boolean, NotFoundException>;

@CommandHandler(DeleteAttributeCommand)
export class DeleteAttributeCommandHandler {
  constructor(
    @Inject(ATTRIBUTE_REPO)
    private readonly attributeRepo: AttributeRepositoryPort,
  ) {}

  async execute(
    command: DeleteAttributeCommand,
  ): Promise<Result<boolean, NotFoundException>> {
    const found = await this.attributeRepo.findOneById(command.attributeId);
    if (found.isNone()) return Err(new NotFoundException());
    const attribute = found.unwrap();
    attribute.delete();
    const result = await this.attributeRepo.delete(attribute);
    return Ok(result);
  }
}
