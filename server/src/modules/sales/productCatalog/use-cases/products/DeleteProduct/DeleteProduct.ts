import { IProductRepo } from '../../../repos/productRepo.js';
import { AppError } from '../../../../../../shared/core/AppError.js';
import {
  Either,
  left,
  Result,
  right,
} from '../../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../../shared/core/UseCase.js';
import { DeleteProductDTO } from './DeleteProductDTO.js';
import { IImagesService } from '../../../infra/imagesFileSystem/index.js';

type Response = Either<
  AppError.UnexpectedError | Result<any> | any,
  any | Result<void>
>;

export class DeleteProduct
  implements UseCase<DeleteProductDTO, Promise<Response>>
{
  constructor(
    private productRepo: IProductRepo,
    private imagesService: IImagesService,
  ) {}

  async execute(request: DeleteProductDTO) {
    try {
      const product = await this.productRepo.getById(request.id);
      if (product === null) {
        return left(new AppError.NotFoundError('Product not found'));
      }
      // TODO Make transactional
      const { id } = request;
      await this.productRepo.delete(id);
      const mediaFileName = product.mediaFileName;
      await this.imagesService.deleteImage(mediaFileName);

      return right(Result.ok<void>());
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
