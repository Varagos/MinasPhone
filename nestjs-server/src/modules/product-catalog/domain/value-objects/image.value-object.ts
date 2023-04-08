import { ValueObject } from '@libs/ddd';
import { Guard } from '@libs/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface ImageProps {
  data: string; // binary data in base64 format
  mimeType: string; // MIME type of the image (e.g. "image/jpeg", "image/png", etc.)
}

export class Image extends ValueObject<ImageProps> {
  get data(): string {
    return this.props.data;
  }

  get mimeType(): string {
    return this.props.mimeType;
  }

  protected validate(props: ImageProps): void {
    if (!Guard.isBase64(props.data)) {
      throw new ArgumentInvalidException('data must be a valid base64 string');
    }

    // You could add more validation here for the MIME type
    // (e.g. check against a list of allowed MIME types)
    if (!Guard.isAllowedMimeType(props.mimeType)) {
      throw new ArgumentInvalidException('mimeType is not allowed');
    }
  }
}
