import { UpdateCart } from './UpdateCart';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest';
import { UpdateCartDTO } from './UpdateCartDTO';

export class UpdateCartController extends BaseController {
  private useCase: UpdateCart;

  constructor(useCase: UpdateCart) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const { id: cartId, line_item_id: cartItemId } = req.params;
    const { quantity } = req.body;
    const dto: UpdateCartDTO = {
      cartId,
      cartItemId,
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
