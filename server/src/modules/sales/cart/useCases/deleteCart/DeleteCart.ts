import { AppError } from '../../../../../shared/core/AppError';
import { Either, left, Result, right } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { DeleteCartDTO } from './DeleteCartDTO';
import { ICartRepo } from '../../repositories/cartRepo';

type Response = Either<AppError.UnexpectedError | Result<any>, Result<void>>;

/**
 * To delete a cart entirely.
 */
export class DeleteCart implements UseCase<DeleteCartDTO, Promise<Response>> {
  constructor(private cartRepo: ICartRepo) {}

  async execute(request: DeleteCartDTO) {
    try {
      const { cartId } = request;
      const cart = await this.cartRepo.retrieve(cartId);
      if (cart === null) {
        return left(new AppError.NotFoundError('Cart not found'));
      }
      return right(Result.ok<void>());
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
