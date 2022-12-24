import { Result } from '../../../../../shared/core/Result.js';
import { UseCaseError } from '../../../../../shared/core/UseCaseError.js';

export namespace UpdateCartErrors {
  export class CartNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Cart not found`,
      } as UseCaseError);
    }
  }

  export class LineItemNotFoundError extends Result<UseCaseError> {
    constructor(lineItemId: string) {
      super(false, {
        message: `Line item {${lineItemId}} not found`,
      } as UseCaseError);
    }
  }
}
