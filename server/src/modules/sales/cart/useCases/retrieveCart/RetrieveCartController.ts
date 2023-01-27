import { BaseController } from '../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest.js';
import { CART_ID_COOKIE_NAME, CART_LIFE_TIME } from '../../config.js';
import { CartDetailsMap } from './../../mappers/CartDetailsMap.js';
import { CreateCart } from './createCart/CreateCart.js';
import { RetrieveCartErrors } from './Errors.js';
import { RetrieveCart } from './RetrieveCart.js';
import { RetrieveCartResponseDTO } from './retrieveCartResponseDTO.js';

export class RetrieveCartController extends BaseController {
  constructor(
    private retrieveCart: RetrieveCart,
    private createCart: CreateCart,
  ) {
    super();
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    try {
      let cartId = req.cookies[CART_ID_COOKIE_NAME];

      if (!cartId) {
        console.log('Cart ID not found in cookies, creating a new cart...');
        const result = await this.createCart.execute();

        if (result.isLeft()) {
          const error = result.value;

          switch (error.constructor) {
            default:
              return this.fail(res, error.getErrorValue().message);
          }
        }

        cartId = result.value;
      }

      const dto = { id: cartId };
      // console.table(dto);
      const result = await this.retrieveCart.execute(dto);
      // console.log({ result });

      if (result.isLeft()) {
        const error = result.value;
        res.clearCookie(CART_ID_COOKIE_NAME);

        switch (error.constructor) {
          case RetrieveCartErrors.CartIdNotProvided:
            return this.notFound(res, error.getErrorValue().message);
          case RetrieveCartErrors.CartDoesNotExist:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      }

      const cartDetails = result.value;
      res.cookie(CART_ID_COOKIE_NAME, cartDetails.id, {
        maxAge: CART_LIFE_TIME,
        httpOnly: true,
      });
      return this.ok<RetrieveCartResponseDTO>(
        res,
        CartDetailsMap.toDTO(cartDetails),
      );
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }
}
