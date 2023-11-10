import {
  InternalServerErrorException,
  NotFoundException,
} from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { PRODUCT_REPO } from '@modules/product-catalog/constants';
import { ReduceProductsStockCommand } from './reduce-products-stock.command';
import { ForeignKeyIntegrityConstraintViolationError } from 'slonik';
import { ProductRepositoryPort } from '@modules/product-catalog/domain/ports/product.repository.port';
import { Money } from '@modules/product-catalog/domain/value-objects/money.value-object';

export type UpdateProductCommandResponse = Result<
  void,
  NotFoundException | InternalServerErrorException
>;

@CommandHandler(ReduceProductsStockCommand)
export class ReduceProductsStockCommandHandler {
  constructor(
    @Inject(PRODUCT_REPO) private readonly productRepo: ProductRepositoryPort,
  ) {}

  async execute(
    command: ReduceProductsStockCommand,
  ): Promise<UpdateProductCommandResponse> {
    try {
      const ids = command.reduceBy.map((item) => item.productId);
      const products = await this.productRepo.findManyByIds(ids);

      const reduceByQuantityMap = command.reduceBy.reduce<
        Record<string, number>
      >((acc, item) => {
        acc[item.productId] = item.quantity;
        return acc;
      }, {});

      for (const product of products) {
        product.reduceStock(reduceByQuantityMap[product.id]);
      }

      await this.productRepo.updateMany(products);

      return Ok(undefined);
    } catch (error) {
      return Err(new InternalServerErrorException());
    }
  }
}
