import { ExceptionBase } from '@libs/exceptions';

export class ProductTypeAlreadyExistsError extends ExceptionBase {
  static readonly message = 'Product type already exists';

  public readonly code = 'PRODUCT_TYPE.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(ProductTypeAlreadyExistsError.message, cause, metadata);
  }
}

export class ProductTypeNameEmptyError extends ExceptionBase {
  static readonly message = 'Product type name cannot be empty';

  public readonly code = 'PRODUCT_TYPE.NAME_EMPTY';

  constructor(cause?: Error, metadata?: unknown) {
    super(ProductTypeNameEmptyError.message, cause, metadata);
  }
}

export class ProductTypeNameTooLongError extends ExceptionBase {
  static readonly message =
    'Product type name exceeds maximum length of 255 characters';

  public readonly code = 'PRODUCT_TYPE.NAME_TOO_LONG';

  constructor(cause?: Error, metadata?: unknown) {
    super(ProductTypeNameTooLongError.message, cause, metadata);
  }
}

export class AttributeNotInProductTypeError extends ExceptionBase {
  static readonly message = 'Attribute not associated with the product type';

  public readonly code = 'PRODUCT_TYPE.ATTRIBUTE_NOT_IN_PRODUCT_TYPE';

  constructor(
    attributeId: string,
    productTypeId: string,
    cause?: Error,
    metadata?: unknown,
  ) {
    super(
      `Attribute with ID "${attributeId}" is not associated with Product Type ID "${productTypeId}"`,
      cause,
      metadata,
    );
  }
}
