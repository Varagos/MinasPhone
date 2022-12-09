import { left } from '../../../../../../shared/core/Result.js';
import { ICategoryRepo } from '../../../repos/categoryRepo.js';
import { CategoryDetails } from '../../../domain/CategoryDetails.js';
import { AppError } from '../../../../../../shared/core/AppError.js';
import { Either, Result, right } from '../../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../../shared/core/UseCase.js';

type Response = Either<AppError.UnexpectedError, Result<CategoryDetails[]>>;

export class GetAllCategories implements UseCase<void, Promise<Response>> {
  private categoryRepo: ICategoryRepo;

  constructor(postRepo: ICategoryRepo) {
    this.categoryRepo = postRepo;
  }
  async execute(): Promise<Response> {
    try {
      const categories = await this.categoryRepo.getAll();
      return right(Result.ok(categories));
    } catch (err: any) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
