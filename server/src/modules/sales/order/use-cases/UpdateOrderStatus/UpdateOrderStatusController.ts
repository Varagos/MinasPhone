import { UpdateOrderStatus } from './UpdateOrderStatus.js';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest.js';
import { UpdateOrderStatusDTO } from './UpdateOrderStatusDTO.js';
import { UpdateOrderStatusErrors } from './Errors.js';

export class UpdateOrderStatusController extends BaseController {
  private useCase: UpdateOrderStatus;

  constructor(useCase: UpdateOrderStatus) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const id = req.params.order_id;

    const dto: UpdateOrderStatusDTO = {
      id,
      status: req.body.status,
    };

    try {
      // console.log({ dto });
      const result = await this.useCase.execute(dto);
      // console.log({ result });

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case UpdateOrderStatusErrors.OrderNotFound:
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
