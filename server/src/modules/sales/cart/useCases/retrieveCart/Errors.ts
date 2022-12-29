import { Result } from '../../../../../shared/core/Result.js';
import { UseCaseError } from '../../../../../shared/core/UseCaseError.js';

export namespace RetrieveCartErrors {
  export class CartIdNotProvided extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `The cart id is undefined.`,
      } as UseCaseError);
    }
  }

  export class CartDoesNotExist extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `The cart does not exist.`,
      } as UseCaseError);
    }
  }
}
