import { AddToCart } from './AddToCart.js';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest.js';
import { AddToCartDTO } from './AddToCartDTO.js';
import { AddToCartErrors as AddToCartErrors } from './Errors.js';
import { CART_ID_COOKIE_NAME } from '../../config.js';

export class AddToCartController extends BaseController {
  private useCase: AddToCart;

  constructor(useCase: AddToCart) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const cartId = req.cookies[CART_ID_COOKIE_NAME];
    if (!cartId) return this.clientError(res, 'Cart not found');
    const { productId, quantity } = req.body;
    const dto: AddToCartDTO = {
      cartId,
      productId,
      quantity,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case AddToCartErrors.CartNotFound:
          case AddToCartErrors.ProductNotFound:
            return this.notFound(res, error.getErrorValue().message);
          case AddToCartErrors.ProductQuantityExceedsAvailableQuantity:
            return this.conflict(res, error.getErrorValue().message);
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
