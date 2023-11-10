import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ProductDeletedDomainEvent } from '@modules/product-catalog/domain/events/product-deleted.domain-event';
import { DeleteImageCommand } from '../commands/delete-image/delete-image.command';

@Injectable()
export class DeleteImageAfterProductDeletionDomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {}

  // Handle a Domain Event by performing changes to other aggregates (inside the same Domain).
  @OnEvent(ProductDeletedDomainEvent.name, { async: true, promisify: true })
  async handle(event: ProductDeletedDomainEvent): Promise<any> {
    const fileName = event.imageUri.split('/').pop();
    if (!fileName) {
      console.error('Image URI is invalid', event.imageUri);
      return;
    }
    const deleteImage = new DeleteImageCommand({ fileName });
    await this.commandBus.execute(deleteImage);
  }
}
