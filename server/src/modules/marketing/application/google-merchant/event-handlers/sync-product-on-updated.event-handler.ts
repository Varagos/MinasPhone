import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus } from '@nestjs/cqrs';
import { ProductUpdatedDomainEvent } from '@modules/product-catalog/domain/events/product-updated.domain-event';
import { SyncProductToGoogleMerchantCommand } from '../commands/sync-product/sync-product.command';

@Injectable()
export class SyncProductToGoogleMerchantOnUpdatedEventHandler {
  private readonly logger = new Logger(
    SyncProductToGoogleMerchantOnUpdatedEventHandler.name,
  );

  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(ProductUpdatedDomainEvent.name, { async: true, promisify: true })
  async handle(event: ProductUpdatedDomainEvent): Promise<void> {
    this.logger.log(
      `Syncing updated product ${event.aggregateId} to Google Merchant`,
    );

    const command = new SyncProductToGoogleMerchantCommand(
      event.aggregateId,
      'update',
    );

    await this.commandBus.execute(command);
  }
}
