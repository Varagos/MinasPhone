import { AppError } from '../../../../../shared/core/AppError';
import { Either, left, Result, right } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { UpdateProductDTO } from './UpdateProductDTO';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { Product } from '../../../domain/Product';
import { IProductRepo } from '../../../repos/productRepo';

type Response = Either<
  AppError.UnexpectedError | Result<any> | any,
  any | Result<void>
>;

export class UpdateProduct
  implements UseCase<UpdateProductDTO, Promise<Response>>
{
  constructor(private productRepo: IProductRepo) {}

  async execute(request: UpdateProductDTO) {
    try {
      const { id, ...props } = request;
      const productOrError = Product.create(props, new UniqueEntityID(id));
      if (productOrError.isFailure) {
        return left(productOrError);
      }
      const product = productOrError.getValue();
      await this.productRepo.update(product);
      return right(Result.ok<void>());
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
