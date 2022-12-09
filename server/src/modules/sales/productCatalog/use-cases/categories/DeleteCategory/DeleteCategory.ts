import { Category } from '../../../domain/Category.js';
import { AppError } from '../../../../../../shared/core/AppError.js';
import {
  Either,
  left,
  Result,
  right,
} from '../../../../../../shared/core/Result.js';
import { CategoryDetails } from '../../../domain/CategoryDetails.js';
import { UseCase } from '../../../../../../shared/core/UseCase.js';
import { DeleteCategoryDTO } from './DeleteCategoryDTO.js';
import { ICategoryRepo } from '../../../repos/categoryRepo.js';
import { UniqueEntityID } from '../../../../../../shared/domain/UniqueEntityID.js';

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
