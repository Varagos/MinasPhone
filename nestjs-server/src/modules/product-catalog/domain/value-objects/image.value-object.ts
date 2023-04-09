import { ValueObject } from '@libs/ddd';
import { Guard } from '@libs/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

export enum MimeType {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
  // add other MIME types as needed
}

Object.freeze(MimeType);

export interface ImageProps {
  data: Buffer; // binary data in base64 format
  mimeType: MimeType; // MIME type of the image (e.g. "image/jpeg", "image/png", etc.)
}

export class Image extends ValueObject<ImageProps> {
  get data(): Buffer {
    return this.props.data;
  }

  get mimeType(): string | undefined {
    return this.props.mimeType;
  }

  /**
   *
   * @param imageData  'data:image/jpeg;base64,/9j/4AAQSk...';
   * @returns a new value object
   */
  static create(imageData: string): Image {
    const matches = imageData.match(/^data:(\w+\/\w+);base64,(.+)$/);

    if (!matches) {
      throw new ArgumentInvalidException('Invalid image data format');
    }

    try {
      const mimeType: any = matches[1];
      const base64EncodedStr = matches[2];
      if (!Guard.isBase64(base64EncodedStr)) {
        throw new ArgumentInvalidException(
          'Image data must be a valid base64 encoded string',
        );
      }
      const data = Buffer.from(base64EncodedStr, 'base64');

      return new Image({ data, mimeType });
    } catch (e: any) {
      throw new ArgumentInvalidException(
        e.message || 'Failed to validate image value object',
      );
    }
  }

  protected validate(props: ImageProps): void {
    const { data, mimeType } = props;
    if (!data || !Buffer.isBuffer(data)) {
      throw new ArgumentInvalidException('data must be a valid buffer');
    }
    if (!Image.isValidMimeType(mimeType)) {
      throw new ArgumentInvalidException(`${mimeType} is not a valid mimeType`);
    }

    // You could add more validation here for the MIME type
    // (e.g. check against a list of allowed MIME types)
    // if (!Guard.isAllowedMimeType(props.mimeType)) {
    //   throw new ArgumentInvalidException('mimeType is not allowed');
    // }
  }

  private static isValidMimeType(
    mimeType: string,
  ): mimeType is ImageProps['mimeType'] {
    return Object.values(MimeType).includes(mimeType as any);
  }
}
