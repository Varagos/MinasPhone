import { GetOneOrder } from './GetOneOrder.js';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest.js';
import { GetOneOrderResponseDTO } from './GetOneOrderResponseDTO.js';
import { OrderDetailsMap } from '../../mappers/OrderDetailsMap.js';
import { GetOneOrderErrors } from './Errors.js';

export class GetOneOrderController extends BaseController {
  private useCase: GetOneOrder;

  constructor(useCase: GetOneOrder) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    try {
      const id = req.params.order_id;
      const result = await this.useCase.execute({ id });
      // console.log({ result });

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case GetOneOrderErrors.OrderNotFoundError:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      }
      const orderDetails = result.value.getValue();
      return this.ok<GetOneOrderResponseDTO>(
        res,
        OrderDetailsMap.toDTO(orderDetails),
      );
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }
}
