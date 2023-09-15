import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { Inject } from '@nestjs/common';
import { CheckoutOrderCommand } from './checkout-order.command';
import { OrderEntity } from '@modules/orders/domain/order.entity';
import { OrderLineItemEntity } from '@modules/orders/domain/order-line-item.entity';
import { ContactInfo } from '@modules/orders/domain/value-objects/contact-info.value-object';
import { Email, PhoneNumber } from '@libs/ddd/standard-value-objects';
import { OrderRepositoryPort } from '@modules/orders/domain/ports/order.repository.port';
import { ORDER_REPO } from '@modules/orders/constants';

export type CheckoutOrderCommandResponse = Result<AggregateID, never>;

@CommandHandler(CheckoutOrderCommand)
export class CheckoutOrderCommandHandler implements ICommandHandler {
  constructor(
    @Inject(ORDER_REPO)
    protected readonly orderRepo: OrderRepositoryPort,
  ) {}

  async execute(
    command: CheckoutOrderCommand,
  ): Promise<Result<AggregateID, never>> {
    const lineItems = command.lineItems.map((item) => {
      const { productId, quantity } = item;
      return OrderLineItemEntity.create({
        productId,
        quantity,
        itemPrice: 10,
        totalPrice: 10,
        productImage: 'image',
        productName: 'name',
      });
    });

    const email = new Email({ value: command.contactInfo.email });
    const phone = new PhoneNumber({ value: command.contactInfo.phone });
    const contactInfo = new ContactInfo({
      firstName: command.contactInfo.firstName,
      lastName: command.contactInfo.lastName,
      email,
      phone,
    });
    const order = OrderEntity.create({
      lineItems,
      contactInfo,
    });

    try {
      /* Wrapping operation in a transaction to make sure
         that all domain events are processed atomically */
      await this.orderRepo.transaction(async () =>
        this.orderRepo.insert(order),
      );
      return Ok(order.id);
    } catch (error: any) {
      throw error;
    }
  }
}
