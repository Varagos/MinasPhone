import { CartDetails } from '../../domain/CartDetails.js';
import { left } from '../../../../../shared/core/Result.js';
import { AppError } from '../../../../../shared/core/AppError.js';
import { Either, Result, right } from '../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../shared/core/UseCase.js';
import { ICartRepo } from '../../repositories/cartRepo.js';
import { isNothing } from '../../../../../shared/core/Maybe.js';
import { RetrieveCartErrors } from './Errors.js';

type Response = Either<
  | AppError.UnexpectedError
  | Result<any>
  | RetrieveCartErrors.CartDoesNotExist
  | RetrieveCartErrors.CartIdNotProvided,
  CartDetails
>;

/**
 * When you first call the method retrieve() using GET v1/carts, it will automatically create a cart for you if a cart does not exist yet
 * or a current cart will be retrieved if the cart_id is passed in as an argument. Front-end tracks the current cart ID using a cookie.
 */

export class RetrieveCart
  implements UseCase<{ id?: string }, Promise<Response>>
{
  constructor(private cartRepo: ICartRepo) {}
  async execute({ id }: { id?: string }): Promise<Response> {
    try {
      if (!id) {
        return left(new RetrieveCartErrors.CartIdNotProvided());
      }

      const cartDetails = await this.cartRepo.retrieveDetails(id);
      if (isNothing(cartDetails)) {
        return left(new RetrieveCartErrors.CartDoesNotExist());
      }
      // Check cart life time, if it is expired, delete the cart and return the appropriate error
      return right(cartDetails);
    } catch (err: any) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
