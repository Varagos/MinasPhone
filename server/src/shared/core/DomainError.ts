import { BaseDomainError } from './BaseDomainError.js';
import { Result } from './Result.js';
import { UseCaseError } from './UseCaseError.js';

export namespace DomainError {
  export class IllegalArgumentException extends Result<BaseDomainError> {
    public constructor(message?: string) {
      super(false, {
        message: message ? message : `Illegal argument.`,
      } as UseCaseError);
    }

    public static create(message?: string): IllegalArgumentException {
      return new IllegalArgumentException(message);
    }
  }
}
