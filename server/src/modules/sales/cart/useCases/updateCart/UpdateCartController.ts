import { UpdateCart } from './UpdateCart.js';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest.js';
import { UpdateCartDTO } from './UpdateCartDTO.js';
import { UpdateCartErrors } from './Errors.js';
import { CART_ID_COOKIE_NAME } from '../../config.js';

export class UpdateCartController extends BaseController {
  private useCase: UpdateCart;

  constructor(useCase: UpdateCart) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const { line_item_id: lineItemId } = req.params;

    const cartId = req.cookies[CART_ID_COOKIE_NAME];
    if (!cartId) return this.clientError(res, 'Cart not found');
    const { quantity } = req.body;
    const dto: UpdateCartDTO = {
      cartId,
      lineItemId,
      quantity,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case UpdateCartErrors.LineItemNotFoundError:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, (error.getErrorValue() as any).message);
        }
      }
      return this.ok(res);
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }
}
