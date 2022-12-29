import { left } from '../../../../../../shared/core/Result.js';
import { AppError } from '../../../../../../shared/core/AppError.js';
import { Either, Result, right } from '../../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../../shared/core/UseCase.js';
import { IProductRepo } from '../../../repos/productRepo.js';
import { ProductDetails } from '../../../domain/ProductDetails.js';

type Response = Either<AppError.UnexpectedError, Result<ProductDetails[]>>;

export class GetAllProducts implements UseCase<void, Promise<Response>> {
  private productRepo: IProductRepo;

  constructor(productRepo: IProductRepo) {
    this.productRepo = productRepo;
  }
  async execute(): Promise<Response> {
    try {
      const products = await this.productRepo.getAll({});
      return right(Result.ok(products));
    } catch (err: any) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
