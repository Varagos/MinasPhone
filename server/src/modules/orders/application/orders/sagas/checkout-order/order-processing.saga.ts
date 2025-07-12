import { OrderCreationStartedDomainEvent } from '@modules/orders/domain/events/order-creation-started.domain-event';
import { ReserveProductsStockCommand } from '@modules/product-catalog/application/products/commands/reserve-products-stocks/reserve-products-stock.command';
import { ProductsStockReservedDomainEvent } from '@modules/product-catalog/domain/events/products-stock-reserved.domain-event';
import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { ConfirmOrderCommand } from '../../commands/confirm-order/confirm-order.command';
import { StockReservationFailedDomainEvent } from '@modules/product-catalog/domain/events/stock-reservation-failed.domain-event';
import { UpdateOrderStatusCommand } from '../../commands/update-order-status/update-order-status.command';
import { OrderStatus } from '@modules/orders/domain/order.entity';
import { OnEvent } from '@nestjs/event-emitter';

/**
 * For Our Use Case
Your Order → Reserve Stock → Confirm workflow is perfect for choreography because:

When to Switch to Orchestration
If  workflow becomes:
Order → Reserve Stock → Process Payment → Send Email → Update Analytics → Generate Invoice → Ship Order
 */

@Injectable()
export class OrderProcessingSaga {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(OrderCreationStartedDomainEvent.name, {
    async: true,
    promisify: true,
  })
  async handleOrderCreationStarted(
    event: OrderCreationStartedDomainEvent,
  ): Promise<void> {
    const command = new ReserveProductsStockCommand({
      value: event.lineItems,
      causationOrderId: event.aggregateId,
    });
    await this.commandBus.execute(command);
  }

  @OnEvent(ProductsStockReservedDomainEvent.name, {
    async: true,
    promisify: true,
  })
  async handleStockReserved(
    event: ProductsStockReservedDomainEvent,
  ): Promise<void> {
    const command = new ConfirmOrderCommand(event.causationOrderId);
    await this.commandBus.execute(command);
  }

  @OnEvent(StockReservationFailedDomainEvent.name, {
    async: true,
    promisify: true,
  })
  async handleStockReservationFailed(
    event: StockReservationFailedDomainEvent,
  ): Promise<void> {
    const command = new UpdateOrderStatusCommand({
      id: event.causationOrderId,
      status: OrderStatus.Cancelled,
    });
    await this.commandBus.execute(command);
  }
}
