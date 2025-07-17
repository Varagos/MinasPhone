import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
// import { OrderCreatedDomainEvent } from '@modules/orders/domain/events/order-created.domain-event';
import {
  CustomerOrderConfirmationData,
  NotificationService,
} from '../services/notification.service';
import { OrderConfirmedDomainEvent } from '@modules/orders/domain/events/order-confirmed.domain-event';

@Injectable()
export class SendCustomerOrderConfirmationEmailHandler {
  private readonly logger = new Logger(
    SendCustomerOrderConfirmationEmailHandler.name,
  );

  constructor(private readonly notificationService: NotificationService) {}

  @OnEvent(OrderConfirmedDomainEvent.name, { async: true, promisify: true })
  async handle(event: OrderConfirmedDomainEvent): Promise<void> {
    this.logger.log(
      `Handling order created event for notification: ${event.id}`,
    );

    try {
      // Extract order data from the event
      const notificationData: CustomerOrderConfirmationData = {
        orderReference: event.orderSlug,
        total: event.total,
        orderItems: event.lineItems.map((item) => ({
          name: item.productName,
          // description: '', // Assuming no description is provided
          quantity: item.quantity,
          // Format with 2 decimal points and add € symbol
          price: `${item.totalPrice.toFixed(2)} €`,
          imageUrl: item.productImage,
        })),
      };

      // Send notification
      const result =
        await this.notificationService.sendCustomerOrderConfirmationEmail(
          notificationData,
          event.customerEmail,
        );

      if (result) {
        this.logger.log(
          `Order creation notification sent successfully for order: ${event.aggregateId}`,
          event.orderSlug,
        );
      } else {
        this.logger.warn(
          `Failed to send order creation notification for order: ${event.aggregateId}`,
        );
      }
    } catch (error: any) {
      this.logger.error(
        `Error processing order creation notification for order: ${event.aggregateId}`,
        error.stack,
      );
    }
  }
}
