import { AppError } from '../../../../../shared/core/AppError';
import { Either, left, Result, right } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { CreateProductDTO } from './CreateProductDTO';
import { IProductRepo } from '../../../repos/productRepo';
import { Product } from '../../../domain/Product';

type Response = Either<
  AppError.UnexpectedError | Result<any> | any,
  any | Result<void>
>;

export class CreateProduct
  implements UseCase<CreateProductDTO, Promise<Response>>
{
  constructor(private productRepo: IProductRepo) {}

  async execute(request: CreateProductDTO) {
    try {
      const productOrError = Product.create(request);
      if (productOrError.isFailure) {
        return left(productOrError);
      }
      const product = productOrError.getValue();
      await this.productRepo.save(product);
      return right(Result.ok<string>(product.id.toString()));
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
