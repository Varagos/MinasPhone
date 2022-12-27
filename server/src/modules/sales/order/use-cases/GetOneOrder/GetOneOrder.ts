import { IOrderRepo } from '../../repos/orderRepo.js';
import { OrderDetails } from '../../domain/OrderDetails.js';
import {
  Either,
  left,
  Result,
  right,
} from '../../../../../shared/core/Result.js';
import { AppError } from '../../../../../shared/core/AppError.js';
import { UseCase } from '../../../../../shared/core/UseCase.js';
import { isNothing } from '../../../../../shared/core/Maybe.js';
import { GetOneOrderErrors } from './Errors.js';

type Response = Either<
  AppError.UnexpectedError | GetOneOrderErrors.OrderNotFoundError,
  Result<OrderDetails>
>;

export class GetOneOrder implements UseCase<{ id: string }, Promise<Response>> {
  constructor(private orderRepo: IOrderRepo) {}
  async execute({ id }: { id: string }): Promise<Response> {
    try {
      const product = await this.orderRepo.getOneById(id);
      if (isNothing(product)) {
        return left(new GetOneOrderErrors.OrderNotFoundError(id));
      }
      return right(Result.ok(product));
    } catch (err: any) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
