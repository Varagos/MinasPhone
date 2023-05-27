import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import {
  ImageUploadException,
  ImagePublicAccessException,
  InvalidImageBufferException,
} from './exceptions';
import { ICloudStorageServicePort } from './cloud-storage.interface';
import {
  Image,
  MimeType,
} from '@modules/product-catalog/domain/value-objects/image.value-object';
import { storageConfig } from '@config/storage.config';
import { ArgumentInvalidException } from '@libs/exceptions';

@Injectable()
export class GoogleCloudStorageServiceAdapter
  implements ICloudStorageServicePort
{
  private storage: Storage;
  private bucketName = storageConfig.gcp_bucket_name;

  constructor() {
    this.storage = new Storage();
  }

  fileNameAndContentType: Partial<Record<MimeType, any>> = {
    [MimeType.PNG]: () => ({
      fileName: `${Date.now()}.png`,
      contentType: 'image/png',
    }),
    [MimeType.JPEG]: () => ({
      fileName: `${Date.now()}.jpeg`,
      contentType: 'image/jpeg',
    }),
  };

  async uploadImage(image: Image): Promise<string> {
    if (!Buffer.isBuffer(image.data)) {
      throw new InvalidImageBufferException();
    }

    if (image.mimeType === undefined) {
      throw new ArgumentInvalidException('Undefined image mime type');
    }

    const filePropsMethod = this.fileNameAndContentType[image.mimeType];
    if (!filePropsMethod) {
      throw new ArgumentInvalidException(
        'Invalid image mime type: ' + image.mimeType,
      );
    }

    const { fileName, contentType } = filePropsMethod();

    const file = this.storage.bucket(this.bucketName).file(fileName);

    const blobStream = file.createWriteStream({
      metadata: {
        contentType,
      },
    });

    blobStream.on('error', (err: any) => {
      console.error(err);
      throw new ImageUploadException();
    });

    blobStream.end(image.data);

    await new Promise((resolve, reject) => {
      blobStream.on('finish', resolve);
      blobStream.on('error', reject);
    });

    // try {
    //   // Make the image publicly accessible
    //   await file.makePublic();
    // } catch (error) {
    //   console.error(error);
    //   throw new ImagePublicAccessException();
    // }

    const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${fileName}`;

    return publicUrl;
  }
}
