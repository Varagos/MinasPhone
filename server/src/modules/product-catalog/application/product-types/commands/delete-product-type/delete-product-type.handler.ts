import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductTypeCommand } from './delete-product-type.command';
import { ProductTypeRepositoryPort } from '@modules/product-catalog/domain/ports/product-type.repository.port';
import { Inject } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { NotFoundException } from '@libs/exceptions';
import { PRODUCT_TYPE_REPO } from '@modules/product-catalog/constants';

export type DeleteProductTypeCommandResponse = Result<boolean, Error>;

@CommandHandler(DeleteProductTypeCommand)
export class DeleteProductTypeCommandHandler
  implements ICommandHandler<DeleteProductTypeCommand>
{
  constructor(
    @Inject(PRODUCT_TYPE_REPO)
    private readonly repo: ProductTypeRepositoryPort,
  ) {}

  async execute(
    command: DeleteProductTypeCommand,
  ): Promise<DeleteProductTypeCommandResponse> {
    const found = await this.repo.findOneById(command.id);

    if (found.isNone()) {
      return Err(new NotFoundException('Product type not found'));
    }

    const productType = found.unwrap();
    productType.delete();
    const result = await this.repo.delete(productType);

    return Ok(result);
  }
}
