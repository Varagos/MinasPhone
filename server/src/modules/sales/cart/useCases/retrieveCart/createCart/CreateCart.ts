import { left } from '../../../../../../shared/core/Result.js';
import { AppError } from '../../../../../../shared/core/AppError.js';
import { Either, Result, right } from '../../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../../shared/core/UseCase.js';
import { ICartRepo } from '../../../repositories/cartRepo.js';
import { Cart } from '../../../domain/Cart.js';
import { UniqueEntityID } from '../../../../../../shared/domain/UniqueEntityID.js';

type Response = Either<AppError.UnexpectedError | Result<any>, UniqueEntityID>;

/**
 * When you first call the method retrieve() using GET v1/carts, it will automatically create a cart for you if a cart does not exist yet
 * or a current cart will be retrieved if the cart_id is passed in as an argument. Front-end tracks the current cart ID using a cookie.
 */

export class CreateCart implements UseCase<void, Promise<Response>> {
  constructor(private cartRepo: ICartRepo) {}
  async execute(): Promise<Response> {
    try {
      // create a new cart
      const cart = Cart.create({ lineItems: [] });
      if (cart.isFailure) {
        return left(cart);
      }
      await this.cartRepo.save(cart.getValue());
      const cartId = cart.getValue().id;
      return right(cartId);
    } catch (err: any) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
