import { Inject, Logger } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { PRODUCT_REPO } from '@modules/product-catalog/constants';
import { ReserveProductsStockCommand } from './reserve-products-stock.command';
import { ProductRepositoryPort } from '@modules/product-catalog/domain/ports/product.repository.port';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RequestContextService } from '@libs/application/context/AppRequestContext';
import { ProductsStockReservedDomainEvent } from '@modules/product-catalog/domain/events/products-stock-reserved.domain-event';
import { StockReservationFailedDomainEvent } from '@modules/product-catalog/domain/events/stock-reservation-failed.domain-event';

export type UpdateProductCommandResponse = void;

@CommandHandler(ReserveProductsStockCommand)
export class ReserveProductsStockCommandHandler {
  private readonly logger: Logger;

  constructor(
    @Inject(PRODUCT_REPO) private readonly productRepo: ProductRepositoryPort,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.logger = new Logger(ReserveProductsStockCommandHandler.name);
  }

  async execute(
    command: ReserveProductsStockCommand,
  ): Promise<UpdateProductCommandResponse> {
    try {
      const { causationOrderId, value } = command;
      const ids = value.map((item) => item.productId);
      const products = await this.productRepo.findManyByIds(ids);

      const reduceByQuantityMap = value.reduce<Record<string, number>>(
        (acc, item) => {
          acc[item.productId] = item.quantity;
          return acc;
        },
        {},
      );

      const stockReservations = products.map((product) =>
        product.reduceStock(reduceByQuantityMap[product.id]),
      );
      const allReservations = Result.all(...stockReservations);

      if (allReservations.isErr()) {
        const firstError = allReservations.unwrapErr();
        throw firstError;
      }
      await this.productRepo.updateMany(products);

      const event = new ProductsStockReservedDomainEvent({
        aggregateId: causationOrderId,
        productIds: ids,
        causationOrderId: causationOrderId,
      });

      this.logger.debug(
        `[${RequestContextService.getRequestId()}] "
            this.id
          }`,
      );
      await this.eventEmitter.emitAsync(event.constructor.name, event);
    } catch (error) {
      this.logger.error(
        `[${RequestContextService.getRequestId()}] Error reserving products stock: ${error}`,
      );
      const event = new StockReservationFailedDomainEvent({
        aggregateId: command.causationOrderId,
        productIds: command.value.map((item) => item.productId),
        causationOrderId: command.causationOrderId,
        reason: error instanceof Error ? error.message : 'Unknown error',
      });
      await this.eventEmitter.emitAsync(event.constructor.name, event);
    }
  }
}
