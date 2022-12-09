import { AppError } from '../../../../../../shared/core/AppError.js';
import {
  Either,
  left,
  Result,
  right,
} from '../../../../../../shared/core/Result.js';
import { UseCase } from '../../../../../../shared/core/UseCase.js';
import { CreateProductDTO } from './CreateProductDTO.js';
import { IProductRepo } from '../../../repos/productRepo.js';
import { Product } from '../../../domain/Product.js';
import { IImagesService } from '../../../infra/imagesFileSystem/index.js';

type Response = Either<
  AppError.UnexpectedError | Result<Product>,
  Result<string>
>;

export class CreateProduct
  implements UseCase<CreateProductDTO, Promise<Response>>
{
  constructor(
    private productRepo: IProductRepo,
    private imagesService: IImagesService,
  ) {}

  async execute(request: CreateProductDTO) {
    const mediaFileName = request.mediaFileName;
    try {
      const productOrError = Product.create(request);
      if (productOrError.isFailure) {
        await this.imagesService.deleteImage(mediaFileName);
        return left(productOrError);
      }
      const product = productOrError.getValue();
      const result = await this.productRepo.save(product);
      if (result.isFailure) {
        await this.imagesService.deleteImage(mediaFileName);
        return left(result);
      }
      return right(Result.ok<string>(product.id.toString()));
    } catch (error: any) {
      await this.imagesService.deleteImage(mediaFileName);
      return left(new AppError.UnexpectedError(error));
    }
  }
}
