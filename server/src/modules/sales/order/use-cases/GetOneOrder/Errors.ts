import { Result } from '../../../../../shared/core/Result.js';
import { UseCaseError } from '../../../../../shared/core/UseCaseError.js';

export namespace GetOneOrderErrors {
  export class OrderNotFoundError extends Result<UseCaseError> {
    constructor(id: string) {
      super(false, {
        message: `Order with id ${id} not found.`,
      } as UseCaseError);
    }
  }
}
