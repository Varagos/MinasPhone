import { CartDetails } from '../../domain/CartDetails.js';
import { left } from '../../../../../shared/core/Result.js';
import { AppError } from '../../../../../shared/core/AppError.js';
import { Either, Result, right } from '../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../shared/core/UseCase.js';
import { ICartRepo } from '../../repositories/cartRepo.js';
import { Cart } from '../../domain/Cart.js';
import { isNothing } from '../../../../../shared/core/Maybe.js';

type Response = Either<AppError.UnexpectedError | Result<any>, CartDetails>;

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
        // create a new cart
        const cart = Cart.create({ lineItems: [] });
        if (cart.isFailure) {
          return left(cart);
        }
        await this.cartRepo.save(cart.getValue());
        const cartId = cart.getValue().id.toString();
        const cartDetails = CartDetails.create({
          id: cartId,
          lineItems: [],
        });
        return right(cartDetails.getValue());
      }

      const cartDetails = await this.cartRepo.retrieveDetails(id);
      if (isNothing(cartDetails)) {
        return left(new AppError.NotFoundError('Cart not found'));
      }
      return right(cartDetails);
    } catch (err: any) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
