import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedDomainEvent } from '@modules/orders/domain/events/order-created.domain-event';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class OrderCreatedNotificationHandler {
  private readonly logger = new Logger(OrderCreatedNotificationHandler.name);

  constructor(private readonly notificationService: NotificationService) {}

  @OnEvent(OrderCreatedDomainEvent.name, { async: true, promisify: true })
  async handle(event: OrderCreatedDomainEvent): Promise<void> {
    this.logger.log(
      `Handling order created event for notification: ${event.id}`,
    );

    try {
      // Extract order data from the event
      const notificationData = {
        orderId: event.aggregateId,
        lineItems: event.lineItems,
        createdAt: new Date(event.metadata.timestamp),
      };

      // Send notification
      const result =
        await this.notificationService.sendOrderCreatedNotification(
          notificationData,
        );

      if (result) {
        this.logger.log(
          `Order creation notification sent successfully for order: ${event.aggregateId}`,
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
