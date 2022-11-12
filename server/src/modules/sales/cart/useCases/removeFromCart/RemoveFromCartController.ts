import { RemoveFromCart } from './RemoveFromCart';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest';
import { RemoveFromCartDTO } from './RemoveFromCartDTO';

export class RemoveFromCartController extends BaseController {
  private useCase: RemoveFromCart;

  constructor(useCase: RemoveFromCart) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const { id: cartId } = req.params;
    const { productId, quantity } = req.body;
    const dto: RemoveFromCartDTO = {
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
