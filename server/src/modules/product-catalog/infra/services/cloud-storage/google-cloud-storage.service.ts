import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import {
  ImageUploadException,
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
    this.storage = new Storage({
      credentials: storageConfig.gcp_service_account,
    });
  }

  // Map MIME types to their canonical file extensions
  private mimeToExtension: Record<MimeType, string> = {
    [MimeType.JPEG]: 'jpeg',
    [MimeType.PNG]: 'png',
    [MimeType.GIF]: 'gif',
    [MimeType.WEBP]: 'webp',
    [MimeType.AVIF]: 'avif',
    [MimeType.SVG]: 'svg',
    [MimeType.HEIC]: 'heic',
    [MimeType.HEIF]: 'heif',
    [MimeType.BMP]: 'bmp',
    [MimeType.TIFF]: 'tiff',
    [MimeType.ICO]: 'ico',
    [MimeType.ICNS]: 'icns',
    [MimeType.APNG]: 'apng',
    [MimeType.JP2]: 'jp2',
    [MimeType.JXL]: 'jxl',
    [MimeType.PSD]: 'psd',
    [MimeType.DDS]: 'dds',
    [MimeType.TGA]: 'tga',
  };

  fileNameAndContentType: Record<
    MimeType,
    () => { fileName: string; contentType: string }
  > = {
    [MimeType.PNG]: () => ({
      fileName: `${Date.now()}.${this.mimeToExtension[MimeType.PNG]}`,
      contentType: 'image/png',
    }),
    [MimeType.JPEG]: () => ({
      fileName: `${Date.now()}.${this.mimeToExtension[MimeType.JPEG]}`,
      contentType: 'image/jpeg',
    }),
    [MimeType.GIF]: () => ({
      fileName: `${Date.now()}.${this.mimeToExtension[MimeType.GIF]}`,
      contentType: 'image/gif',
    }),
    [MimeType.WEBP]: () => ({
      fileName: `${Date.now()}.${this.mimeToExtension[MimeType.WEBP]}`,
      contentType: 'image/webp',
    }),
    [MimeType.AVIF]: () => ({
      fileName: `${Date.now()}.${this.mimeToExtension[MimeType.AVIF]}`,
      contentType: 'image/avif',
    }),
    [MimeType.SVG]: () => ({
      fileName: `${Date.now()}.${this.mimeToExtension[MimeType.SVG]}`,
      contentType: 'image/svg+xml',
    }),
    [MimeType.HEIC]: () => ({
      fileName: `${Date.now()}.${this.mimeToExtension[MimeType.HEIC]}`,
      contentType: 'image/heic',
    }),
    [MimeType.HEIF]: () => ({
      fileName: `${Date.now()}.${this.mimeToExtension[MimeType.HEIF]}`,
      contentType: 'image/heif',
    }),
    [MimeType.BMP]: () => ({
      fileName: `${Date.now()}.${this.mimeToExtension[MimeType.BMP]}`,
      contentType: 'image/bmp',
    }),
    [MimeType.TIFF]: () => ({
      fileName: `${Date.now()}.${this.mimeToExtension[MimeType.TIFF]}`,
      contentType: 'image/tiff',
    }),
    [MimeType.ICO]: () => ({
      fileName: `${Date.now()}.${this.mimeToExtension[MimeType.ICO]}`,
      contentType: 'image/x-icon',
    }),
    [MimeType.ICNS]: () => ({
      fileName: `${Date.now()}.${this.mimeToExtension[MimeType.ICNS]}`,
      contentType: 'image/x-icns',
    }),
    [MimeType.APNG]: () => ({
      fileName: `${Date.now()}.${this.mimeToExtension[MimeType.APNG]}`,
      contentType: 'image/apng',
    }),
    [MimeType.JP2]: () => ({
      fileName: `${Date.now()}.${this.mimeToExtension[MimeType.JP2]}`,
      contentType: 'image/jp2',
    }),
    [MimeType.JXL]: () => ({
      fileName: `${Date.now()}.${this.mimeToExtension[MimeType.JXL]}`,
      contentType: 'image/jxl',
    }),
    [MimeType.PSD]: () => ({
      fileName: `${Date.now()}.${this.mimeToExtension[MimeType.PSD]}`,
      contentType: 'image/vnd.adobe.photoshop',
    }),
    [MimeType.DDS]: () => ({
      fileName: `${Date.now()}.${this.mimeToExtension[MimeType.DDS]}`,
      contentType: 'image/vnd.ms-dds',
    }),
    [MimeType.TGA]: () => ({
      fileName: `${Date.now()}.${this.mimeToExtension[MimeType.TGA]}`,
      contentType: 'image/x-tga',
    }),
    // Add other MIME types as needed
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

  async deleteImage(fileName: string): Promise<void> {
    const file = this.storage.bucket(this.bucketName).file(fileName);

    await file.delete();
  }
}
