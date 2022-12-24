import { AppError } from '../../../../../../shared/core/AppError.js';
import {
  Either,
  left,
  Result,
  right,
} from '../../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../../shared/core/UseCase.js';
import { UpdateProductDTO } from './UpdateProductDTO.js';
import { IProductRepo } from '../../../repos/productRepo.js';
import { IImagesService } from '../../../infra/imagesFileSystem/index.js';
import { isNothing } from '../../../../../../shared/core/Maybe.js';

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
      if (isNothing(product)) {
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
      await this.productRepo.save(product);
      return right(Result.ok<void>());
    } catch (error: any) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
