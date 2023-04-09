import { NotFoundException } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { PRODUCT_REPO } from '@modules/product-catalog/constants';
import { DeleteProductCommand } from './delete-product.command';
import { ProductRepositoryPort } from '@modules/product-catalog/domain/ports/product.repository.port';

export type DeleteProductCommandResponse = Result<boolean, NotFoundException>;

@CommandHandler(DeleteProductCommand)
export class DeleteProductCommandHandler {
  constructor(
    @Inject(PRODUCT_REPO)
    private readonly productRepo: ProductRepositoryPort,
  ) {}

  async execute(
    command: DeleteProductCommand,
  ): Promise<Result<boolean, NotFoundException>> {
    const found = await this.productRepo.findOneById(command.id);
    if (found.isNone()) return Err(new NotFoundException());
    const product = found.unwrap();
    product.delete();
    const result = await this.productRepo.delete(product);
    return Ok(result);
  }
}
