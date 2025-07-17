import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EmailService } from './application/services/email.service';
import { OrderCreatedNotificationHandler } from './application/event-handlers/order-created-notification.domain-event-handler';
import { NotificationService } from './application/services/notification.service';
import { SendCustomerOrderConfirmationEmailHandler } from './application/event-handlers/send-customer-order-confirmation-email.domain-event-handler';

const eventHandlers = [
  OrderCreatedNotificationHandler,
  SendCustomerOrderConfirmationEmailHandler,
];
const services = [EmailService, NotificationService];

@Module({
  imports: [CqrsModule],
  providers: [...eventHandlers, ...services],
  exports: [NotificationService],
})
export class NotificationsModule {}
