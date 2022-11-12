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
import { CreateCategoryDTO } from './CreateCategoryDTO';
import { ICategoryRepo } from '../../../repos/categoryRepo';

type Response = Either<
  AppError.UnexpectedError | Result<any> | any,
  any | Result<void>
>;

export class CreateCategory
  implements UseCase<CreateCategoryDTO, Promise<Response>>
{
  constructor(private categoryRepo: ICategoryRepo) {}

  async execute(request: CreateCategoryDTO) {
    try {
      const categoryOrError = Category.create(request);
      if (categoryOrError.isFailure) {
        return left(categoryOrError);
      }
      const category = categoryOrError.getValue();
      await this.categoryRepo.save(category);
      return right(Result.ok<string>(category.id.toString()));
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
