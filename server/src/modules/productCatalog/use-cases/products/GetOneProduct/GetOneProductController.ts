import { GetOneProduct } from './GetOneProduct';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest';
import { GetOneProductResponseDTO } from './GetOneProductResponseDTO';
import { ProductDetailsMap } from '../../../mappers/ProductDetailsMap';

export class GetOneProductController extends BaseController {
  private useCase: GetOneProduct;

  constructor(useCase: GetOneProduct) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    try {
      const id = req.params.id;
      const result = await this.useCase.execute({ id });
      // console.log({ result });

      if (result.isLeft()) {
        const error = result.value;

        return this.fail(res, (error as any).getErrorValue().message);
      } else {
        const productDetails = result.value.getValue();
        return this.ok<GetOneProductResponseDTO>(res, {
          product: ProductDetailsMap.toDTO(productDetails),
        });
      }
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }
}
