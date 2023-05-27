import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { ArgumentInvalidException } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { UploadImageCommand } from './upload-image.command';
import { Image } from '@modules/product-catalog/domain/value-objects/image.value-object';
import { CLOUD_STORAGE_SERVICE } from '@modules/product-catalog/constants';
import { ICloudStorageServicePort } from '@modules/product-catalog/infra/services/cloud-storage/cloud-storage.interface';
import {
  ImageUploadException,
  InvalidImageBufferException,
} from '@modules/product-catalog/infra/services/cloud-storage/exceptions';

export type ImagePublicUrl = string;

export type UploadImageCommandResponse = Result<
  ImagePublicUrl,
  ImageUploadException | ArgumentInvalidException | InvalidImageBufferException
>;

@CommandHandler(UploadImageCommand)
export class UploadImageCommandHandler implements ICommandHandler {
  constructor(
    @Inject(CLOUD_STORAGE_SERVICE)
    protected readonly cloudStorageService: ICloudStorageServicePort,
  ) {}

  async execute(
    command: UploadImageCommand,
  ): Promise<UploadImageCommandResponse> {
    try {
      const image = Image.create(command.image);

      const publicUrl = await this.cloudStorageService.uploadImage(image);
      return Ok(publicUrl);
    } catch (error: any) {
      return Err(error);
    }
  }
}
