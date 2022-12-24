import { Result } from '../../../../../shared/core/Result.js';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest.js';
import { CaptureCheckout } from './CaptureCheckout.js';
import { CaptureCheckoutDTO } from './CaptureCheckoutDTO.js';

export class CaptureCheckoutController extends BaseController {
  private useCase: CaptureCheckout;

  constructor(useCase: CaptureCheckout) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    try {
      const dto: CaptureCheckoutDTO = {
        cartId: req.params.cart_id,
      };
      console.log('dto', dto);
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        console.log('Result', error.getErrorValue());
        switch (error.constructor) {
          case Result: {
            return this.clientError(res, error.getErrorValue() as any);
          }
          default: {
            return this.fail(res, (error as any).getErrorValue().message);
          }
        }
      }
      const id = (result.value as any).getValue();
      return this.ok(res, { id });
    } catch (err: any) {
      console.log({ err });
      return this.fail(res, err);
    }
  }
}
