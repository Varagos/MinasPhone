import { AppError } from '../../../../../shared/core/AppError.js';
import { isNothing } from '../../../../../shared/core/Maybe.js';
import {
  Either,
  left,
  Result,
  right,
} from '../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../shared/core/UseCase.js';
import { ICartRepo } from '../../../cart/repositories/cartRepo.js';
import { OrderService } from '../../domain/services/orderService.js';
import { IOrderRepo } from '../../repos/orderRepo.js';
import { CaptureCheckoutDTO } from './CaptureCheckoutDTO.js';
import { CaptureCheckoutErrors } from './Errors.js';

type Response = Either<
  | AppError.UnexpectedError
  | CaptureCheckoutErrors.CartNotFound
  | CaptureCheckoutErrors.FailedToCreateOrder,
  Result<string>
>;

export class CaptureCheckout
  implements UseCase<CaptureCheckoutDTO, Promise<Response>>
{
  constructor(
    private orderRepo: IOrderRepo,
    private orderService: OrderService,
    private cartRepo: ICartRepo,
  ) {}

  async execute(request: CaptureCheckoutDTO) {
    try {
      const { cartId, ...contactInfo } = request;
      const cart = await this.cartRepo.retrieve(cartId);
      if (isNothing(cart)) {
        return left(new CaptureCheckoutErrors.CartNotFound());
      }
      const orderOrError = this.orderService.captureOder(cart, contactInfo);
      if (orderOrError.isLeft()) {
        return left(orderOrError.value);
      }
      const order = orderOrError.value.getValue();
      await this.orderRepo.save(order);
      return right(Result.ok<string>(order.id.toString()));
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
