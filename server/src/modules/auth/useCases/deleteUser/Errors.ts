import { Result } from '../../../../shared/core/Result.js';
import { UseCaseError } from '../../../../shared/core/UseCaseError.js';

export namespace DeleteUserErrors {
  export class InvalidEmail extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Email is invalid`,
      } as UseCaseError);
    }
  }

  export class UserNotFound extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `User not found`,
      } as UseCaseError);
    }
  }
}
