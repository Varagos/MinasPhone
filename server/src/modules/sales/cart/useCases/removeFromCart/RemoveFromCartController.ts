import { RemoveFromCart } from './RemoveFromCart.js';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest.js';
import { RemoveFromCartDTO } from './RemoveFromCartDTO.js';
import { RemoveFromCartErrors } from './Errors.js';

export class RemoveFromCartController extends BaseController {
  private useCase: RemoveFromCart;

  constructor(useCase: RemoveFromCart) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const { id: cartId, line_item_id: lineItemId } = req.params;
    const dto: RemoveFromCartDTO = {
      cartId,
      lineItemId,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case RemoveFromCartErrors.LineItemNotFoundError:
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
