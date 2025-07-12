import { ExceptionBase } from '@libs/exceptions';

export class InsufficientStockError extends ExceptionBase {
  static readonly message = 'Insufficient stock available';

  public readonly code = 'ORDER.INSUFFICIENT_STOCK';

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

export class InvalidOrderStatusError extends ExceptionBase {
  static readonly message = 'Invalid order status';

  public readonly code = 'ORDER.INVALID_STATUS';

  constructor(status: string, cause?: Error, metadata?: unknown) {
    super(`${InvalidOrderStatusError.message}: ${status}`, cause, metadata);
  }
}
