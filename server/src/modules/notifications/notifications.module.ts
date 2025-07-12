import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EmailService } from './application/services/email.service';
import { OrderCreatedNotificationHandler } from './application/event-handlers/order-created-notification.domain-event-handler';
import { NotificationService } from './application/services/notification.service';

const eventHandlers = [OrderCreatedNotificationHandler];
const services = [EmailService, NotificationService];

@Module({
  imports: [CqrsModule],
  providers: [...eventHandlers, ...services],
  exports: [NotificationService],
})
export class NotificationsModule {}
