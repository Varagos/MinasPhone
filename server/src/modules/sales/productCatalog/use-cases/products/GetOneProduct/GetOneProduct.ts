import { left } from '../../../../../../shared/core/Result.js';
import { AppError } from '../../../../../../shared/core/AppError.js';
import { Either, Result, right } from '../../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../../shared/core/UseCase.js';
import { IProductRepo } from '../../../repos/productRepo.js';
import { ProductDetails } from '../../../domain/ProductDetails.js';

type Response = Either<AppError.UnexpectedError, Result<ProductDetails>>;

export class GetOneProduct
  implements UseCase<{ id: string }, Promise<Response>>
{
  private productRepo: IProductRepo;

  constructor(productRepo: IProductRepo) {
    this.productRepo = productRepo;
  }
  async execute({ id }: { id: string }): Promise<Response> {
    try {
      const product = await this.productRepo.getOneById(id);
      return right(Result.ok(product));
    } catch (err: any) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
