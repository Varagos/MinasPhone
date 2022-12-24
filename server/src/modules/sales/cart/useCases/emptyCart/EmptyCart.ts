import { AppError } from '../../../../../shared/core/AppError.js';
import {
  Either,
  left,
  Result,
  right,
} from '../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../shared/core/UseCase.js';
import { EmptyCartDTO } from './EmptyCartDTO.js';
import { ICartRepo } from '../../repositories/cartRepo.js';
import { isNothing } from '../../../../../shared/core/Maybe.js';

type Response = Either<AppError.UnexpectedError | Result<any>, Result<void>>;

/**
 * To delete a cart entirely.
 */
export class EmptyCart implements UseCase<EmptyCartDTO, Promise<Response>> {
  constructor(private cartRepo: ICartRepo) {}

  async execute(request: EmptyCartDTO) {
    try {
      const { cartId } = request;
      const cart = await this.cartRepo.retrieve(cartId);
      if (isNothing(cart)) {
        return left(new AppError.NotFoundError('Cart not found'));
      }
      cart.empty();
      await this.cartRepo.save(cart);
      return right(Result.ok<void>());
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
