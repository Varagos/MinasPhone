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
import { AddToCartErrors } from './Errors.js';
import { IProductRepo } from '../../../productCatalog/repos/productRepo.js';
import { isNothing } from '../../../../../shared/core/Maybe.js';

type Response = Either<
  | AppError.UnexpectedError
  | AddToCartErrors.CartNotFound
  | AddToCartErrors.ProductNotFound
  | AddToCartErrors.ProductQuantityExceedsAvailableQuantity,
  Result<void>
>;

export class AddToCart implements UseCase<AddToCartDTO, Promise<Response>> {
  constructor(private cartRepo: ICartRepo, private productRepo: IProductRepo) {}

  async execute(request: AddToCartDTO) {
    try {
      const { cartId } = request;
      const cart = await this.cartRepo.retrieve(cartId);
      if (isNothing(cart)) {
        return left(new AddToCartErrors.CartNotFound());
      }
      const { productId, quantity } = request;
      const product = await this.productRepo.getById(productId);
      if (isNothing(product)) {
        return left(new AddToCartErrors.ProductNotFound());
      }
      if (quantity > product.quantity) {
        return left(
          new AddToCartErrors.ProductQuantityExceedsAvailableQuantity(
            product.quantity,
            quantity,
          ),
        );
      }
      const addResultOrError = cart.add(product, quantity);
      if (addResultOrError.isFailure) {
        return left(new AddToCartErrors.FailedToCreateCartItems(productId));
      }
      await this.cartRepo.save(cart);
      return right(Result.ok<void>());
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
