import { GetAllProducts } from './GetAllProducts';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest';
import { GetAllProductsResponseDTO } from './GetAllProductsResponseDTO';
import { ProductDetailsMap } from '../../../mappers/ProductDetailsMap';

export class GetAllProductsController extends BaseController {
  private useCase: GetAllProducts;

  constructor(useCase: GetAllProducts) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    try {
      const result = await this.useCase.execute();
      // console.log({ result });

      if (result.isLeft()) {
        const error = result.value;

        return this.fail(res, (error as any).getErrorValue().message);
      } else {
        const productDetails = result.value.getValue();
        return this.ok<GetAllProductsResponseDTO>(res, {
          products: productDetails.map((prod: any) =>
            ProductDetailsMap.toDTO(prod),
          ),
        });
      }
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }
}
