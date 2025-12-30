import { ExceptionBase } from '@libs/exceptions';

export class AttributeAlreadyExistsError extends ExceptionBase {
  static readonly message = 'Attribute already exists';

  public readonly code = 'ATTRIBUTE.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(AttributeAlreadyExistsError.message, cause, metadata);
  }
}

export class AttributeNameEmptyError extends ExceptionBase {
  static readonly message = 'Attribute name cannot be empty';

  public readonly code = 'ATTRIBUTE.NAME_EMPTY';

  constructor(cause?: Error, metadata?: unknown) {
    super(AttributeNameEmptyError.message, cause, metadata);
  }
}

export class AttributeNameTooLongError extends ExceptionBase {
  static readonly message =
    'Attribute name exceeds maximum length of 255 characters';

  public readonly code = 'ATTRIBUTE.NAME_TOO_LONG';

  constructor(cause?: Error, metadata?: unknown) {
    super(AttributeNameTooLongError.message, cause, metadata);
  }
}

export class InvalidValueTypeError extends ExceptionBase {
  public readonly code = 'ATTRIBUTE.INVALID_VALUE_TYPE';

  constructor(valueType: string, cause?: Error, metadata?: unknown) {
    super(`Invalid value type: ${valueType}`, cause, metadata);
  }
}

export class InvalidInputTypeError extends ExceptionBase {
  public readonly code = 'ATTRIBUTE.INVALID_INPUT_TYPE';

  constructor(inputType: string, cause?: Error, metadata?: unknown) {
    super(`Invalid input type: ${inputType}`, cause, metadata);
  }
}

export class EnumAttributeWithoutValuesError extends ExceptionBase {
  public readonly code = 'ATTRIBUTE.ENUM_WITHOUT_VALUES';

  constructor(msg: string, cause?: Error, metadata?: unknown) {
    super(msg, cause, metadata);
  }
}

export class NonEnumAttributeWithValuesError extends ExceptionBase {
  public readonly code = 'ATTRIBUTE.NON_ENUM_WITH_VALUES';

  constructor(msg: string, cause?: Error, metadata?: unknown) {
    super(msg, cause, metadata);
  }
}

export class AttributeValueEmptyError extends ExceptionBase {
  static readonly message = 'Attribute value cannot be empty';

  public readonly code = 'ATTRIBUTE.VALUE_EMPTY';

  constructor(cause?: Error, metadata?: unknown) {
    super(AttributeValueEmptyError.message, cause, metadata);
  }
}

export class DuplicateAttributeValueError extends ExceptionBase {
  public readonly code = 'ATTRIBUTE.DUPLICATE_VALUE';

  constructor(value: string, cause?: Error, metadata?: unknown) {
    super(`Duplicate attribute value: ${value}`, cause, metadata);
  }
}

export class DuplicateAttributeValueCaseInsensitiveError extends ExceptionBase {
  public readonly code = 'ATTRIBUTE.DUPLICATE_VALUE_CASE_INSENSITIVE';

  constructor(
    value: string,
    existingValue: string,
    cause?: Error,
    metadata?: unknown,
  ) {
    super(
      `Duplicate attribute value: ${value} (already exists as ${existingValue})`,
      cause,
      metadata,
    );
  }
}

export class NegativeDisplayOrderError extends ExceptionBase {
  static readonly message = 'Display order must be a positive number';

  public readonly code = 'ATTRIBUTE.NEGATIVE_DISPLAY_ORDER';

  constructor(cause?: Error, metadata?: unknown) {
    super(NegativeDisplayOrderError.message, cause, metadata);
  }
}

export class AttributeValueValidationError extends ExceptionBase {
  public readonly code = 'ATTRIBUTE_VALUE.VALIDATION_ERROR';

  constructor(
    valueType: string,
    type: string,
    attributeId: string,
    cause?: Error,
    metadata?: unknown,
  ) {
    super(
      `Attribute value of type "${valueType}" is not valid for type "${type}" on attribute ID "${attributeId}"`,
      cause,
      metadata,
    );
  }
}
