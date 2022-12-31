import { BaseController } from '../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest.js';

import { CART_ID_COOKIE_NAME, CART_LIFE_TIME } from '../../config.js';
import { CreateCart } from './CreateCart.js';

export class RetrieveCartController extends BaseController {
  private useCase: CreateCart;

  constructor(useCase: CreateCart) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    try {
      const result = await this.useCase.execute();

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      }

      const cartId = result.value;
      res.cookie(CART_ID_COOKIE_NAME, cartId.toString(), {
        maxAge: CART_LIFE_TIME,
        httpOnly: true,
      });
      return this.ok(res);
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }
}
