import { CartDetails } from '../../domain/CartDetails';
import { left } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { Either, Result, right } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { ICartRepo } from '../../repositories/cartRepo';

type Response = Either<AppError.UnexpectedError, Result<CartDetails>>;

/**
 * When you first call the method retrieve() using GET v1/carts, it will automatically create a cart for you if a cart does not exist yet
 * or a current cart will be retrieved if the cart_id is passed in as an argument. Front-end tracks the current cart ID using a cookie.
 */

export class RetrieveCart
  implements UseCase<{ id: string }, Promise<Response>>
{
  constructor(private cartRepo: ICartRepo) {}
  async execute({ id }: { id: string }): Promise<Response> {
    try {
      const cartDetails = await this.cartRepo.retrieveDetails(id);
      return right(Result.ok(cartDetails));
    } catch (err: any) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
