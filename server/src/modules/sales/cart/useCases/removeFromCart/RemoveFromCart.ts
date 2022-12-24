import { AppError } from '../../../../../shared/core/AppError.js';
import {
  Either,
  left,
  Result,
  right,
} from '../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../shared/core/UseCase.js';
import { RemoveFromCartDTO } from './RemoveFromCartDTO.js';
import { ICartRepo } from '../../repositories/cartRepo.js';
import { isNothing } from '../../../../../shared/core/Maybe.js';
import { Identifier } from '../../../../../shared/domain/Identifier.js';
import { RemoveFromCartErrors } from './Errors.js';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID.js';

type Response = Either<
  | AppError.UnexpectedError
  | RemoveFromCartErrors.LineItemNotFoundError
  | Result<any>,
  Result<void>
>;

export class RemoveFromCart
  implements UseCase<RemoveFromCartDTO, Promise<Response>>
{
  constructor(private cartRepo: ICartRepo) {}

  async execute(request: RemoveFromCartDTO) {
    try {
      const { cartId, lineItemId } = request;
      const cart = await this.cartRepo.retrieve(cartId);
      if (isNothing(cart)) {
        return left(new AppError.NotFoundError('Cart not found'));
      }
      const removeOrError = cart.remove(new UniqueEntityID(lineItemId));
      if (removeOrError.isLeft()) {
        return left(new RemoveFromCartErrors.LineItemNotFoundError(lineItemId));
      }
      await this.cartRepo.save(cart);
      return right(Result.ok<void>());
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
