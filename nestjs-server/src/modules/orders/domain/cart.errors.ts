import { ExceptionBase } from '@libs/exceptions';

export class CategoryAlreadyExistsError extends ExceptionBase {
  static readonly message = 'Category already exists';

  public readonly code = 'CATEGORY.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(CategoryAlreadyExistsError.message, cause, metadata);
  }
}

export class LineItemNotFoundError extends ExceptionBase {
  static readonly message = 'Line item not found';

  public readonly code = 'LINE_ITEM.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(LineItemNotFoundError.message, cause, metadata);
  }
}
