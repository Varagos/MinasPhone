import { GetOrderList } from './GetOrderList.js';
import { GetOrderListResponseDTO } from './GetOrderListResponseDTO.js';
import { OrderDetailsMap } from '../../mappers/OrderDetailsMap.js';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest.js';
import { GetOrderListErrors } from './Errors.js';

export class GetOrderListController extends BaseController {
  private useCase: GetOrderList;

  constructor(useCase: GetOrderList) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    try {
      const { filter, sort, range } = req.query;
      // console.log({ result });
      const dto = {
        filter,
        sort,
        range,
      } as any;
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case GetOrderListErrors.InvalidSortByField:
          case GetOrderListErrors.InvalidFilterFields:
            return this.clientError(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      }
      const orderDetail = result.value.getValue();
      return this.ok<GetOrderListResponseDTO>(
        res,
        orderDetail.map((order) => OrderDetailsMap.toDTO(order)),
      );
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }

  private isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}
