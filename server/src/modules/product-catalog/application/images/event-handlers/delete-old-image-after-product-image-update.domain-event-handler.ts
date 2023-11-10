import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteImageCommand } from '../commands/delete-image/delete-image.command';
import { ProductImageUpdatedDomainEvent } from '@modules/product-catalog/domain/events/product-image-updated.domain-event';

@Injectable()
export class DeleteOldImageAfterProductImageUpdateDomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {}

  // Handle a Domain Event by performing changes to other aggregates (inside the same Domain).
  @OnEvent(ProductImageUpdatedDomainEvent.name, {
    async: true,
    promisify: true,
  })
  async handle(event: ProductImageUpdatedDomainEvent): Promise<any> {
    const fileName = event.oldImageUri.split('/').pop();
    if (!fileName) {
      console.error('Image URI is invalid', event.oldImageUri);
      return;
    }
    const deleteImage = new DeleteImageCommand({ fileName });
    await this.commandBus.execute(deleteImage);
  }
}
