import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ProductDeletedDomainEvent } from '@modules/product-catalog/domain/events/product-deleted.domain-event';
import { OrderCreatedDomainEvent } from '@modules/orders/domain/events/order-created.domain-event';

@Injectable()
export class UpdateStockAfterOrderCreationDomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {}

  // Handle a Domain Event by performing changes to other aggregates (inside the same Domain).
  @OnEvent(ProductDeletedDomainEvent.name, { async: true, promisify: true })
  async handle(event: OrderCreatedDomainEvent): Promise<void> {
    const { lineItems } = event;
    // TODO
    // const updatePrduct = new UpdateProductCommand({
    //   id: event.productId,
    //   quantity: event.quantity,
    // });
    // await this.commandBus.execute(command);
  }
}
