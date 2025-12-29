import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ConflictException } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CreateAttributeCommand } from './create-attribute.command';
import * as AttributeErrors from '@modules/product-catalog/domain/attribute.errors';
import { ATTRIBUTE_REPO } from '@modules/product-catalog/constants';
import { AttributeEntity } from '@modules/product-catalog/domain/attribute.entity';
import { AttributeRepositoryPort } from '@modules/product-catalog/domain/ports/attribute.repository.port';

export type CreateAttributeCommandResponse = Result<
  AggregateID,
  | AttributeErrors.AttributeAlreadyExistsError
  | AttributeErrors.AttributeNameEmptyError
  | AttributeErrors.AttributeNameTooLongError
  | AttributeErrors.InvalidValueTypeError
  | AttributeErrors.InvalidInputTypeError
  | AttributeErrors.EnumAttributeWithoutValuesError
  | AttributeErrors.NonEnumAttributeWithValuesError
  | AttributeErrors.AttributeValueEmptyError
  | AttributeErrors.DuplicateAttributeValueError
  | AttributeErrors.DuplicateAttributeValueCaseInsensitiveError
  | AttributeErrors.NegativeDisplayOrderError
>;

@CommandHandler(CreateAttributeCommand)
export class CreateAttributeCommandHandler
  implements ICommandHandler<CreateAttributeCommand>
{
  constructor(
    @Inject(ATTRIBUTE_REPO)
    protected readonly attributeRepo: AttributeRepositoryPort,
  ) {}

  async execute(
    command: CreateAttributeCommand,
  ): Promise<CreateAttributeCommandResponse> {
    try {
      const attributeResult = AttributeEntity.create({
        name: command.name,
        valueType: command.valueType,
        inputType: command.inputType,
        unit: command.unit,
        attributeValues: command.attributeValues,
      });

      if (attributeResult.isErr()) {
        return Err(attributeResult.unwrapErr());
      }

      const attribute = attributeResult.unwrap();

      /* Wrapping operation in a transaction to make sure
         that all domain events are processed atomically */

      await this.attributeRepo.insert(attribute);

      return Ok(attribute.id);
    } catch (error) {
      if (error instanceof ConflictException) {
        return Err(new AttributeErrors.AttributeAlreadyExistsError(error));
      }

      throw error;
    }
  }
}
