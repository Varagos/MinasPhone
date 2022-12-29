import { IHandle } from '../../../../shared/domain/events/IHandle.js';
import { OrderCreatedEvent } from '../../../sales/order/domain/events/OrderCreated.js';
import { DomainEvents } from '../../../../shared/domain/events/DomainEvents.js';
import { SendEmail } from '../use-cases/sendEmail/SendEmail.js';

export class AfterOrderCreated implements IHandle<OrderCreatedEvent> {
  constructor(private sendEmail: SendEmail) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    // Register to the domain event
    DomainEvents.register(
      this.onOrderCreatedEvent.bind(this),
      OrderCreatedEvent.name,
    );
  }

  // This is called when the domain event is dispatched.
  private async onOrderCreatedEvent(event: OrderCreatedEvent): Promise<void> {
    const { order } = event;

    try {
      await this.sendEmail.execute({
        email: order.contactInfo.email,
        order,
      });
    } catch (err) {
      console.error(err);
    }
  }
}
