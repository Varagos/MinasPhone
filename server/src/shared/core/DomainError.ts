import { BaseDomainError } from './BaseDomainError';
import { Result } from './Result';
import { UseCaseError } from './UseCaseError';

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
