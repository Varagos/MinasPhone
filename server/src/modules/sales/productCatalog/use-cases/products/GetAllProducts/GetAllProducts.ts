import { left } from '../../../../../../shared/core/Result';
import { AppError } from '../../../../../../shared/core/AppError';
import { Either, Result, right } from '../../../../../../shared/core/Result';
import { UseCase } from '../../../../../../shared/core/UseCase';
import { IProductRepo } from '../../../repos/productRepo';
import { ProductDetails } from '../../../domain/ProductDetails';

type Response = Either<AppError.UnexpectedError, Result<ProductDetails[]>>;

export class GetAllProducts implements UseCase<void, Promise<Response>> {
  private productRepo: IProductRepo;

  constructor(productRepo: IProductRepo) {
    this.productRepo = productRepo;
  }
  async execute(): Promise<Response> {
    try {
      const products = await this.productRepo.getAll();
      return right(Result.ok(products));
    } catch (err: any) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
