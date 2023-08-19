import { ExceptionBase } from '@libs/exceptions';

export class ProductAlreadyExistsError extends ExceptionBase {
  static readonly message = 'Product already exists';

  public readonly code = 'PRODUCT.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(ProductAlreadyExistsError.message, cause, metadata);
  }
}
