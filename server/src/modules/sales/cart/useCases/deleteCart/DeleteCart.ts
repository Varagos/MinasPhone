import { AppError } from '../../../../../shared/core/AppError.js';
import {
  Either,
  left,
  Result,
  right,
} from '../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../shared/core/UseCase.js';
import { DeleteCartDTO } from './DeleteCartDTO.js';
import { ICartRepo } from '../../repositories/cartRepo.js';

type Response = Either<AppError.UnexpectedError | Result<any>, Result<void>>;

/**
 * To delete a cart entirely.
 */
export class DeleteCart implements UseCase<DeleteCartDTO, Promise<Response>> {
  constructor(private cartRepo: ICartRepo) {}

  async execute(request: DeleteCartDTO) {
    try {
      const { cartId } = request;
      const cartExists = await this.cartRepo.exists(cartId);
      if (!cartExists) {
        return left(new AppError.NotFoundError('Cart not found'));
      }
      await this.cartRepo.delete(cartId);
      return right(Result.ok<void>());
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
