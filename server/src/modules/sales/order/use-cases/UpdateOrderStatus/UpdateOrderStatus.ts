import {
  Either,
  left,
  Result,
  right,
} from '../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../shared/core/UseCase.js';
import { UpdateOrderStatusDTO } from './UpdateOrderStatusDTO.js';
import { isNothing } from '../../../../../shared/core/Maybe.js';
import { IOrderRepo } from '../../repos/orderRepo.js';
import { AppError } from '../../../../../shared/core/AppError.js';
import { UpdateOrderStatusErrors } from './Errors.js';
import { OrderStatus } from '../../domain/OrderStatus.js';

type Response = Either<
  | AppError.UnexpectedError
  | UpdateOrderStatusErrors.OrderNotFound
  | UpdateOrderStatusErrors.InvalidOrderStatus,
  Result<void>
>;

export class UpdateOrderStatus
  implements UseCase<UpdateOrderStatusDTO, Promise<Response>>
{
  constructor(private orderRepo: IOrderRepo) {}

  async execute(request: UpdateOrderStatusDTO) {
    try {
      const { id, status } = request;
      const statusOrError = OrderStatus.create(status);
      if (statusOrError.isFailure) {
        return left(new UpdateOrderStatusErrors.InvalidOrderStatus(status));
      }
      const order = await this.orderRepo.getById(id);
      if (isNothing(order)) {
        return left(new AppError.NotFoundError('Order not found'));
      }
      order.updateStatus(statusOrError.getValue());
      await this.orderRepo.updateStatus(order);
      return right(Result.ok<void>());
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
