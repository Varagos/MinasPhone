import { Category } from '../../../domain/Category';
import { AppError } from '../../../../../../shared/core/AppError';
import {
  Either,
  left,
  Result,
  right,
} from '../../../../../../shared/core/Result';
import { CategoryDetails } from '../../../domain/CategoryDetails';
import { UseCase } from '../../../../../../shared/core/UseCase';
import { DeleteCategoryDTO } from './DeleteCategoryDTO';
import { ICategoryRepo } from '../../../repos/categoryRepo';
import { UniqueEntityID } from '../../../../../../shared/domain/UniqueEntityID';

type Response = Either<
  AppError.UnexpectedError | Result<any> | any,
  any | Result<void>
>;

export class DeleteCategory
  implements UseCase<DeleteCategoryDTO, Promise<Response>>
{
  constructor(private categoryRepo: ICategoryRepo) {}

  async execute(request: DeleteCategoryDTO) {
    try {
      const { id } = request;

      await this.categoryRepo.delete(id);
      return right(Result.ok<void>());
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
