import { BaseController } from '../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest.js';
import { CartDetailsMap } from './../../mappers/CartDetailsMap.js';
import { RetrieveCart } from './RetrieveCart.js';
import { RetrieveCartResponseDTO } from './retrieveCartResponseDTO.js';

const CART_LIFE_TIME = 1000 * 60 * 60 * 24 * 30; // 30 days
export class RetrieveCartController extends BaseController {
  private useCase: RetrieveCart;

  constructor(useCase: RetrieveCart) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    try {
      const cartId = req.cookies.cart_id;
      const dto = { id: cartId };
      const result = await this.useCase.execute(dto);
      // console.log({ result });

      if (result.isLeft()) {
        const error = result.value;

        return this.fail(res, (error as any).getErrorValue().message);
      }

      const cartDetails = result.value;
      res.cookie('cart_id', cartDetails.id, {
        maxAge: CART_LIFE_TIME,
        // httpOnly: true,
      });
      return this.ok<RetrieveCartResponseDTO>(res, {
        cart: CartDetailsMap.toDTO(cartDetails),
      });
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }
}
