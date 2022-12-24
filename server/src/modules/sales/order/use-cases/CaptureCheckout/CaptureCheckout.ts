import { AppError } from '../../../../../shared/core/AppError.js';
import {
  Either,
  left,
  Result,
  right,
} from '../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../shared/core/UseCase.js';
import { Order } from '../../domain/Order.js';
import { IOrderRepo } from '../../repos/orderRepo.js';
import { CaptureCheckoutDTO } from './CaptureCheckoutDTO.js';

type Response = Either<
  AppError.UnexpectedError | Result<Order>,
  Result<string>
>;

export class CaptureCheckout
  implements UseCase<CaptureCheckoutDTO, Promise<Response>>
{
  constructor(
    private orderRepo: IOrderRepo,
    private orderCartDomainService: any,
  ) {}

  async execute(request: CaptureCheckoutDTO) {
    try {
      const { cartId } = request;
      const orderOrError =
        this.orderCartDomainService.createOrderFromCartId(cartId);
      if (orderOrError.isFailure) {
        return left(orderOrError);
      }
      const product = orderOrError.getValue();
      await this.orderRepo.save(product);
      return right(Result.ok<string>(product.id.toString()));
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
