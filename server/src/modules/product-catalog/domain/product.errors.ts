import { ExceptionBase } from '@libs/exceptions';

export class ProductAlreadyExistsError extends ExceptionBase {
  static readonly message = 'Product already exists';

  public readonly code = 'PRODUCT.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(ProductAlreadyExistsError.message, cause, metadata);
  }
}

export class InsufficientStockError extends ExceptionBase {
  static readonly message = 'Insufficient stock available';

  public readonly code = 'PRODUCT.INSUFFICIENT_STOCK';

  constructor(
    productId: string,
    productName: string,
    request: number,
    available: number,
    cause?: Error,
    metadata?: unknown,
  ) {
    super(
      `${InsufficientStockError.message} for product "${productName}" (ID: ${productId}). Requested: ${request}, Available: ${available}`,
      cause,
      metadata,
    );
  }
}

export class ProductAttributeValueValidationError extends ExceptionBase {
  static readonly message = 'Invalid product attribute value';

  public readonly code = 'PRODUCT_ATTRIBUTE_VALUE.VALIDATION_ERROR';

  constructor(cause?: Error, metadata?: unknown) {
    super(ProductAttributeValueValidationError.message, cause, metadata);
  }
}
