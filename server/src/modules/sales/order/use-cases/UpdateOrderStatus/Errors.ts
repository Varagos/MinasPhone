import { Result } from '../../../../../shared/core/Result.js';
import { UseCaseError } from '../../../../../shared/core/UseCaseError.js';

export namespace UpdateOrderStatusErrors {
  export class OrderNotFound extends Result<UseCaseError> {
    constructor(id: string) {
      super(false, {
        message: `Order with id ${id} not found.`,
      } as UseCaseError);
    }
  }

  export class InvalidOrderStatus extends Result<UseCaseError> {
    constructor(status: string) {
      super(false, {
        message: `Invalid order status: ${status}`,
      } as UseCaseError);
    }
  }
}
