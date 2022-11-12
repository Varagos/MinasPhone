import { left } from '../../../../../../shared/core/Result';
import { AppError } from '../../../../../../shared/core/AppError';
import { Either, Result, right } from '../../../../../../shared/core/Result';
import { UseCase } from '../../../../../../shared/core/UseCase';
import { IProductRepo } from '../../../repos/productRepo';
import { ProductDetails } from '../../../domain/ProductDetails';

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
