import { EmptyCart } from './EmptyCart.js';

import { BaseController } from '../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest.js';
import { EmptyCartDTO } from './EmptyCartDTO.js';
import { AppError } from '../../../../../shared/core/AppError.js';
import { CART_ID_COOKIE_NAME } from '../../config.js';

export class EmptyCartController extends BaseController {
  constructor(private useCase: EmptyCart) {
    super();
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const cartId = req.cookies[CART_ID_COOKIE_NAME];
    if (!cartId) return this.clientError(res, 'Cart not found');
    const dto: EmptyCartDTO = {
      cartId,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case AppError.NotFoundError:
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
