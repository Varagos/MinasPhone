import { AppError } from '../../../../../shared/core/AppError.js';
import {
  Either,
  left,
  Result,
  right,
} from '../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../shared/core/UseCase.js';
import { UpdateCartDTO } from './UpdateCartDTO.js';
import { ICartRepo } from '../../repositories/cartRepo.js';
import { isNothing } from '../../../../../shared/core/Maybe.js';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID.js';
import { UpdateCartErrors } from './Errors.js';

type Response = Either<AppError.UnexpectedError | Result<any>, Result<void>>;

export class UpdateCart implements UseCase<UpdateCartDTO, Promise<Response>> {
  constructor(private cartRepo: ICartRepo) {}

  async execute(request: UpdateCartDTO) {
    try {
      const { cartId, lineItemId, quantity } = request;

      const cart = await this.cartRepo.retrieve(cartId);
      if (isNothing(cart)) {
        return left(new AppError.NotFoundError('Cart not found'));
      }
      const updateOrError = cart.updateQuantity(
        new UniqueEntityID(lineItemId),
        quantity,
      );

      // TODO Check that new quantity is not greater than stock, use a domain service
      if (updateOrError.isLeft()) {
        return left(new UpdateCartErrors.LineItemNotFoundError(lineItemId));
      }
      await this.cartRepo.save(cart);
      return right(Result.ok<void>());
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
