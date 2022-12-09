import { Result } from './Result.js';
import { UseCaseError } from './UseCaseError.js';

export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    public constructor(err: any) {
      super(false, {
        message: `An unexpected error occurred.`,
        error: err,
      } as UseCaseError);
      // console.log(`[AppError]: An unexpected error occurred`);
      console.error(err);
    }

    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }

  export class NotFoundError extends Result<UseCaseError> {
    public constructor(message?: string) {
      super(false, {
        message: message ? message : `Not found.`,
      } as UseCaseError);
    }

    public static create(message?: string): NotFoundError {
      return new NotFoundError(message);
    }
  }
}
