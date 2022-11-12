import { EmptyCart } from './EmptyCart';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest';
import { EmptyCartDTO } from './EmptyCartDTO';

export class EmptyCartController extends BaseController {
  constructor(private useCase: EmptyCart) {
    super();
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const { id: cartId } = req.params;
    const dto: EmptyCartDTO = {
      cartId,
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
