import { DeleteCart } from './DeleteCart.js';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest.js';
import { DeleteCartDTO } from './DeleteCartDTO.js';

export class DeleteCartController extends BaseController {
  constructor(private useCase: DeleteCart) {
    super();
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const { id: cartId } = req.params;
    const { productId, quantity } = req.body;
    const dto: DeleteCartDTO = {
      cartId,
      productId,
      quantity,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        return this.fail(res, (error.getErrorValue() as any).message);
      } else {
        return this.ok(res);
      }
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }
}
