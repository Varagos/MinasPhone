import { BaseController } from '../../../../shared/infra/http/models/BaseController.js';
import { GetUserInfo } from './getUserInfo.js';
import { DecodedExpressRequest } from '../../../../shared/infra/http/models/decodedRequest.js';
import { getUserInfoDTO } from './getUserDTO.js';

export class GetUserInfoController extends BaseController {
  constructor(private useCase: GetUserInfo) {
    super();
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const dto: getUserInfoDTO = {
      id: req.params.id,
      email: req.body.email,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        return this.fail(res, (error as any).getErrorValue().message);
      }
      return this.ok(res, result.value.getValue());
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }
}
