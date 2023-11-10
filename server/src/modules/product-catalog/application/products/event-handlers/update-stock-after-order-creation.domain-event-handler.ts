import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ProductDeletedDomainEvent } from '@modules/product-catalog/domain/events/product-deleted.domain-event';
import { OrderCreatedDomainEvent } from '@modules/orders/domain/events/order-created.domain-event';
import { ReduceProductsStockCommand } from '../commands/reduce-products-stock/reduce-products-stock.command';

/**
 * TODO handle transaction reduction of products stock with the order creation
 */

@Injectable()
export class UpdateStockAfterOrderCreationDomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {}

  // Handle a Domain Event by performing changes to other aggregates (inside the same Domain).
  @OnEvent(OrderCreatedDomainEvent.name, { async: true, promisify: true })
  async handle(event: OrderCreatedDomainEvent): Promise<void> {
    const { lineItems } = event;
    const command = new ReduceProductsStockCommand({
      reduceBy: lineItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    });
    await this.commandBus.execute(command);
  }
}
