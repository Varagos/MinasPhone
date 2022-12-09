import { Category } from '../../../domain/Category.js';
import { AppError } from '../../../../../../shared/core/AppError.js';
import {
  Either,
  left,
  Result,
  right,
} from '../../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../../shared/core/UseCase.js';
import { UpdateCategoryDTO } from './UpdateCategoryDTO.js';
import { ICategoryRepo } from '../../../repos/categoryRepo.js';
import { UniqueEntityID } from '../../../../../../shared/domain/UniqueEntityID.js';

type Response = Either<
  AppError.UnexpectedError | Result<any> | any,
  any | Result<void>
>;

export class UpdateCategory
  implements UseCase<UpdateCategoryDTO, Promise<Response>>
{
  constructor(private categoryRepo: ICategoryRepo) {}

  async execute(request: UpdateCategoryDTO) {
    try {
      const { id, ...props } = request;
      const categoryOrError = Category.create(props, new UniqueEntityID(id));
      if (categoryOrError.isFailure) {
        return left(categoryOrError);
      }
      const category = categoryOrError.getValue();
      await this.categoryRepo.update(category);
      return right(Result.ok<void>());
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
