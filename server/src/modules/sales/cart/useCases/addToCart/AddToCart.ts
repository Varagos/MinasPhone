import { AppError } from '../../../../../shared/core/AppError.js';
import {
  Either,
  left,
  Result,
  right,
} from '../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../shared/core/UseCase.js';
import { AddToCartDTO } from './AddToCartDTO.js';
import { ICartRepo } from '../../repositories/cartRepo.js';

type Response = Either<AppError.UnexpectedError | Result<any>, Result<void>>;

export class AddToCart implements UseCase<AddToCartDTO, Promise<Response>> {
  constructor(private cartRepo: ICartRepo) {}

  async execute(request: AddToCartDTO) {
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
