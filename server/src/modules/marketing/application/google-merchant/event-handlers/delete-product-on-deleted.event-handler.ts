import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus } from '@nestjs/cqrs';
import { ProductDeletedDomainEvent } from '@modules/product-catalog/domain/events/product-deleted.domain-event';
import { SyncProductToGoogleMerchantCommand } from '../commands/sync-product/sync-product.command';

@Injectable()
export class DeleteProductFromGoogleMerchantOnDeletedEventHandler {
  private readonly logger = new Logger(
    DeleteProductFromGoogleMerchantOnDeletedEventHandler.name,
  );

  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(ProductDeletedDomainEvent.name, { async: true, promisify: true })
  async handle(event: ProductDeletedDomainEvent): Promise<void> {
    this.logger.log(
      `Deleting product ${event.aggregateId} from Google Merchant`,
    );

    const command = new SyncProductToGoogleMerchantCommand(
      event.aggregateId,
      'delete',
    );

    await this.commandBus.execute(command);
  }
}
