import { Result } from '../../../../../../shared/core/Result.js';
import { UseCaseError } from '../../../../../../shared/core/UseCaseError.js';

export namespace GetByCategorySlugErrors {
  export class InvalidSortByField extends Result<UseCaseError> {
    constructor(field: string) {
      super(false, {
        message: `Invalid sort by field: ${field}`,
      } as UseCaseError);
    }
  }

  export class InvalidFilterFields extends Result<UseCaseError> {
    constructor(...fields: string[]) {
      super(false, {
        message: `Invalid filter fields: ${fields.join(', ')}`,
      } as UseCaseError);
    }
  }
}
