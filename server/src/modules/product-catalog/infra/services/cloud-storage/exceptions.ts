import { HttpException, HttpStatus } from '@nestjs/common';

export class ImageUploadException extends HttpException {
  constructor() {
    super('Image failed to upload', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class ImagePublicAccessException extends HttpException {
  constructor() {
    super(
      'Failed to make the image publicly accessible',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class InvalidImageBufferException extends HttpException {
  constructor() {
    super(
      'Provided image Buffer is invalid or corrupt',
      HttpStatus.BAD_REQUEST,
    );
  }
}
