import { Result } from '../../../../../shared/core/Result.js';
import { UseCaseError } from '../../../../../shared/core/UseCaseError.js';

export namespace GetOrderListErrors {
  export class InvalidSortByField extends Result<UseCaseError> {
    constructor(field: string) {
      super(false, {
        message: `The field ${field} is not a valid field to sort by.`,
      } as UseCaseError);
    }
  }

  export class InvalidFilterField extends Result<UseCaseError> {
    constructor(field: string) {
      super(false, {
        message: `The field ${field} is not a valid field to filter by.`,
      } as UseCaseError);
    }
  }
}
