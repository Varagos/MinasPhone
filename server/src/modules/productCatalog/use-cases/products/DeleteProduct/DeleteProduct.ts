import { IProductRepo } from './../../../repos/productRepo';
import { AppError } from '../../../../../shared/core/AppError';
import { Either, left, Result, right } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { DeleteProductDTO } from './DeleteProductDTO';

type Response = Either<
  AppError.UnexpectedError | Result<any> | any,
  any | Result<void>
>;

export class DeleteProduct
  implements UseCase<DeleteProductDTO, Promise<Response>>
{
  constructor(private productRepo: IProductRepo) {}

  async execute(request: DeleteProductDTO) {
    try {
      const { id } = request;

      await this.productRepo.delete(id);
      return right(Result.ok<void>());
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
