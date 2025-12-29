import {
  InternalServerErrorException,
  NotFoundException,
} from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { ATTRIBUTE_REPO } from '@modules/product-catalog/constants';
import { UpdateAttributeCommand } from './update-attribute.command';
import { ForeignKeyIntegrityConstraintViolationError } from 'slonik';
import { AttributeRepositoryPort } from '@modules/product-catalog/domain/ports/attribute.repository.port';
import * as AttributeErrors from '@modules/product-catalog/domain/attribute.errors';

export type UpdateProductCommandResponse = Result<
  void,
  | NotFoundException
  | InternalServerErrorException
  | AttributeErrors.AttributeNameEmptyError
  | AttributeErrors.AttributeNameTooLongError
>;

@CommandHandler(UpdateAttributeCommand)
export class UpdateAttributeCommandHandler {
  constructor(
    @Inject(ATTRIBUTE_REPO)
    private readonly attributeRepo: AttributeRepositoryPort,
  ) {}

  async execute(
    command: UpdateAttributeCommand,
  ): Promise<UpdateProductCommandResponse> {
    try {
      const found = await this.attributeRepo.findOneById(command.id);

      if (found.isNone()) {
        return Err(new NotFoundException());
      }
      const attribute = found.unwrap();

      if (command.name !== undefined) {
        const result = attribute.updateName(command.name);
        if (result.isErr()) {
          return Err(result.unwrapErr());
        }
      }

      // TODO update of the rest props

      await this.attributeRepo.update(attribute);
      return Ok(undefined);
    } catch (error) {
      if (error instanceof ForeignKeyIntegrityConstraintViolationError) {
        return Err(
          new NotFoundException(`Attribute not found: ${command.id} `),
        );
      }
      console.error(error);
      return Err(new InternalServerErrorException());
    }
  }
}
