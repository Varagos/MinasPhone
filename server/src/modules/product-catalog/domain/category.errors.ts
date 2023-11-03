import { ExceptionBase } from '@libs/exceptions';

export class CategoryAlreadyExistsError extends ExceptionBase {
  static readonly message = 'Category already exists';

  public readonly code = 'CATEGORY.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(CategoryAlreadyExistsError.message, cause, metadata);
  }
}
