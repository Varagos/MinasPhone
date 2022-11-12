import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest';
import { CartDetailsMap } from './../../mappers/CartDetailsMap';
import { RetrieveCart } from './RetriveCart';
import { RetrieveCartResponseDTO } from './retrieveCartResponseDTO';

export class RetrieveCartController extends BaseController {
  private useCase: RetrieveCart;

  constructor(useCase: RetrieveCart) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    try {
      const dto = { id: req.params.id };
      const result = await this.useCase.execute(dto);
      // console.log({ result });

      if (result.isLeft()) {
        const error = result.value;

        return this.fail(res, (error as any).getErrorValue().message);
      } else {
        const cartDetails = result.value.getValue();
        return this.ok<RetrieveCartResponseDTO>(res, {
          cart: CartDetailsMap.toDTO(cartDetails),
        });
      }
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }
}
