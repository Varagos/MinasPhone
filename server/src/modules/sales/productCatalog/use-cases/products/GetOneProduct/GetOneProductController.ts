import { GetOneProduct } from './GetOneProduct.js';
import { BaseController } from '../../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../../shared/infra/http/models/decodedRequest.js';
import { GetOneProductResponseDTO } from './GetOneProductResponseDTO.js';
import { ProductDetailsMap } from '../../../mappers/ProductDetailsMap.js';

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
