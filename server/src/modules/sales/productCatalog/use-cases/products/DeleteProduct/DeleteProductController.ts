import { DeleteProduct } from './DeleteProduct.js';
import { BaseController } from '../../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../../shared/infra/http/models/decodedRequest.js';
import { DeleteProductDTO } from './DeleteProductDTO.js';

export class DeleteProductController extends BaseController {
  private useCase: DeleteProduct;

  constructor(useCase: DeleteProduct) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const dto: DeleteProductDTO = {
      id: req.params.id,
    };

    try {
      // console.log({ dto });
      const result = await this.useCase.execute(dto);
      // console.log({ result });

      if (result.isLeft()) {
        const error = result.value;

        return this.fail(res, (error as any).getErrorValue().message);
      } else {
        return this.ok(res);
      }
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }
}
