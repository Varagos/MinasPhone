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
import { AddToCartCartErrors } from './Errors.js';
import { IProductRepo } from '../../../productCatalog/repos/productRepo.js';
import { isNothing } from '../../../../../shared/core/Maybe.js';

type Response = Either<
  | AppError.UnexpectedError
  | AddToCartCartErrors.CartDoesNotExist
  | AddToCartCartErrors.ProductNotFound
  | Result<any>,
  Result<void>
>;

export class AddToCart implements UseCase<AddToCartDTO, Promise<Response>> {
  constructor(private cartRepo: ICartRepo, private productRepo: IProductRepo) {}

  async execute(request: AddToCartDTO) {
    try {
      const { cartId } = request;
      const cart = await this.cartRepo.retrieve(cartId);
      if (isNothing(cart)) {
        return left(new AddToCartCartErrors.CartDoesNotExist());
      }
      const { productId, quantity } = request;
      const product = await this.productRepo.getById(productId);
      if (product === null) {
        return left(new AddToCartCartErrors.ProductNotFound());
      }
      if (quantity > product.quantity) {
        return left(
          new AddToCartCartErrors.ProductQuantityExceedsAvailableQuantity(
            product.quantity,
            quantity,
          ),
        );
      }
      const addResultOrError = cart.add(product, quantity);
      if (addResultOrError.isFailure) {
        return left(addResultOrError);
      }
      await this.cartRepo.save(cart);
      return right(Result.ok<void>());
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
