import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { DeleteImageCommand } from './delete-image.command';
import { CLOUD_STORAGE_SERVICE } from '@modules/product-catalog/constants';
import { ICloudStorageServicePort } from '@modules/product-catalog/infra/services/cloud-storage/cloud-storage.interface';

export type UploadImageCommandResponse = Result<void, any>;

@CommandHandler(DeleteImageCommand)
export class DeleteImageCommandHandler implements ICommandHandler {
  constructor(
    @Inject(CLOUD_STORAGE_SERVICE)
    protected readonly cloudStorageService: ICloudStorageServicePort,
  ) {}

  async execute(
    command: DeleteImageCommand,
  ): Promise<UploadImageCommandResponse> {
    try {
      await this.cloudStorageService.deleteImage(command.fileName);
      console.log('Image deleted');
      return Ok(undefined);
    } catch (error: any) {
      console.log('Error deleting image');
      console.log(error);
      return Err(error);
    }
  }
}
