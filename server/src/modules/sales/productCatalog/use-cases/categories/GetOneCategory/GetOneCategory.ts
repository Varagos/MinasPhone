import { left } from '../../../../../../shared/core/Result.js';
import { ICategoryRepo } from '../../../repos/categoryRepo.js';
import { CategoryDetails } from '../../../domain/CategoryDetails.js';
import { AppError } from '../../../../../../shared/core/AppError.js';
import { Either, Result, right } from '../../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../../shared/core/UseCase.js';

type Response = Either<AppError.UnexpectedError, Result<CategoryDetails>>;

export class GetOneCategory
  implements UseCase<{ id: string }, Promise<Response>>
{
  private categoryRepo: ICategoryRepo;

  constructor(postRepo: ICategoryRepo) {
    this.categoryRepo = postRepo;
  }
  async execute({ id }: { id: string }): Promise<Response> {
    try {
      const category = await this.categoryRepo.getOneById(id);
      return right(Result.ok(category));
    } catch (err: any) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
