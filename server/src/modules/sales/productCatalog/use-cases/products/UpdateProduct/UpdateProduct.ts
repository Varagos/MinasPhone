import { AppError } from '../../../../../../shared/core/AppError';
import {
  Either,
  left,
  Result,
  right,
} from '../../../../../../shared/core/Result';
import { UseCase } from '../../../../../../shared/core/UseCase';
import { UpdateProductDTO } from './UpdateProductDTO';
import { IProductRepo } from '../../../repos/productRepo';
import { IImagesService } from '../../../infra/imagesFileSystem';

type Response = Either<AppError.UnexpectedError | Result<any>, Result<void>>;

export class UpdateProduct
  implements UseCase<UpdateProductDTO, Promise<Response>>
{
  constructor(
    private productRepo: IProductRepo,
    private imagesService: IImagesService,
  ) {}

  async execute(request: UpdateProductDTO) {
    try {
      const { id, newImageUploaded, ...props } = request;
      const product = await this.productRepo.getById(id);
      if (product === null) {
        return left(new AppError.NotFoundError('Product not found'));
      }
      if (newImageUploaded) {
        // TODO delete the old image
        await this.imagesService.deleteImage(product.mediaFileName);
      }
      const updateRes = product.updateProps(props);
      if (updateRes.isFailure) {
        return left(updateRes);
      }
      await this.productRepo.update(product);
      return right(Result.ok<void>());
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
