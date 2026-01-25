import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus } from '@nestjs/cqrs';
import { ProductCreatedDomainEvent } from '@modules/product-catalog/domain/events/product-created.domain-event';
import { SyncProductToGoogleMerchantCommand } from '../commands/sync-product/sync-product.command';

@Injectable()
export class SyncProductToGoogleMerchantOnCreatedEventHandler {
  private readonly logger = new Logger(
    SyncProductToGoogleMerchantOnCreatedEventHandler.name,
  );

  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(ProductCreatedDomainEvent.name, { async: true, promisify: true })
  async handle(event: ProductCreatedDomainEvent): Promise<void> {
    this.logger.log(
      `Syncing newly created product ${event.aggregateId} to Google Merchant`,
    );

    const command = new SyncProductToGoogleMerchantCommand(
      event.aggregateId,
      'insert',
    );

    await this.commandBus.execute(command);
  }
}
