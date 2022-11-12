import { AppError } from '../../../../../shared/core/AppError';
import { Either, left, Result, right } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { RefreshCartDTO } from './RefreshCartDTO';
import { ICartRepo } from '../../repositories/cartRepo';

type Response = Either<AppError.UnexpectedError | Result<any>, Result<void>>;

/**
 * The refresh() method uses GET v1/carts to create a new cart and update the stored cart ID front-end cookie,
 * also delete the old one
 *
 * Perhaps this useCase should be removed,
 * and the front-end should just call the API directly.(delete, then create)
 */
export class RefreshCart implements UseCase<RefreshCartDTO, Promise<Response>> {
  constructor(private cartRepo: ICartRepo) {}

  async execute(request: RefreshCartDTO) {
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
