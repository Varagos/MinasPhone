import { Result } from '../../../../../shared/core/Result.js';
import { UseCaseError } from '../../../../../shared/core/UseCaseError.js';

export namespace CaptureCheckoutErrors {
  export class CartIdNotProvided extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `The cart id is undefined.`,
      } as UseCaseError);
    }
  }

  export class CartNotFound extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `The cart does not exist.`,
      } as UseCaseError);
    }
  }

  export class FailedToCreateOrder extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Failed to create the order.`,
      } as UseCaseError);
    }
  }

  export class CartIsEmpty extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `The cart is empty.`,
      } as UseCaseError);
    }
  }
}
