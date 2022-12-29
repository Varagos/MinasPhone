import { AppError } from '../../../../../shared/core/AppError.js';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest.js';
import { CreateCart } from './CreateCart.js';

const CART_LIFE_TIME = 1000 * 60 * 60 * 24 * 30; // 30 days
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
          case AppError.NotFoundError:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, (error as any).getErrorValue().message);
        }
      }

      const cartId = result.value;
      res.cookie('cart_id', cartId.toString(), {
        maxAge: CART_LIFE_TIME,
        // httpOnly: true,
      });
      return this.ok(res);
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }
}
