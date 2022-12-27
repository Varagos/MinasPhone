import { AppError } from '../../../../../shared/core/AppError.js';
import {
  Either,
  left,
  Result,
  right,
} from '../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../shared/core/UseCase.js';
import { OrderDetails } from '../../domain/OrderDetails.js';
import { IOrderRepo } from '../../repos/orderRepo.js';
import { GetOrderListErrors } from './Errors.js';
import { GetOrderListRequestDTO } from './GetOrderListDTO.js';

type Response = Either<
  AppError.UnexpectedError | GetOrderListErrors.InvalidSortByField,
  Result<OrderDetails[]>
>;

export class GetOrderList
  implements UseCase<GetOrderListRequestDTO, Promise<Response>>
{
  constructor(private orderRepo: IOrderRepo) {}

  async execute(request: GetOrderListRequestDTO): Promise<Response> {
    try {
      const sortByField = request.sort?.[0];

      if (sortByField) {
        const allowedFields = ['id', 'createdAt', 'updatedAt'];
        if (!allowedFields.includes(sortByField))
          return left(new GetOrderListErrors.InvalidSortByField(sortByField));
      }

      if (request.filter) {
        const allowedFields = ['id', 'createdAt', 'updatedAt', 'status'];
        const filterFields = Object.keys(request.filter);

        const unacceptableFields = filterFields.filter(
          (field) => !allowedFields.includes(field),
        );
        if (unacceptableFields.length > 0)
          return left(
            new GetOrderListErrors.InvalidFilterFields(...unacceptableFields),
          );
      }
      const products = await this.orderRepo.getAll(request);
      return right(Result.ok(products));
    } catch (err: any) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
