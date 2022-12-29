import { Result } from '../../../../../shared/core/Result.js';
import { UseCaseError } from '../../../../../shared/core/UseCaseError.js';

export namespace AddToCartErrors {
  export class CartIdNotProvided extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `The cart id is undefined.`,
      } as UseCaseError);
    }
  }

  export class FailedToCreateCartItems extends Result<UseCaseError> {
    constructor(productId: string) {
      super(false, {
        message: `Failed to create cart item for ${productId}.`,
      } as UseCaseError);
    }
  }

  export class ProductNotFound extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `The product does not exist.`,
      } as UseCaseError);
    }
  }

  export class ProductQuantityExceedsAvailableQuantity extends Result<UseCaseError> {
    constructor(productStock: number, requestedQuantity: number) {
      super(false, {
        message: `The product quantity exceeds the available quantity. Product stock: ${productStock}, requested quantity: ${requestedQuantity}`,
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
}
