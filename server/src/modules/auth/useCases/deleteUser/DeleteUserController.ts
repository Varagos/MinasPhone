import { BaseController } from '../../../../shared/infra/http/models/BaseController.js';
import { DeleteUser } from './deleteUser.js';
import { DecodedExpressRequest } from '../../../../shared/infra/http/models/decodedRequest.js';
import { DeleteUserDTO } from './deleteUserDTO.js';
import { DeleteUserErrors } from './Errors.js';

export class DeleteUserController extends BaseController {
  constructor(private useCase: DeleteUser) {
    super();
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const dto: DeleteUserDTO = {
      id: req.body.id,
      email: req.body.email,
    };
    console.log({ dto });

    try {
      // console.log({ dto });
      const result = await this.useCase.execute(dto);
      // console.log({ result });

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case DeleteUserErrors.InvalidEmail:
            return this.clientError(res, error.getErrorValue().message);
          case DeleteUserErrors.UserNotFound:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      }
      return this.ok(res);
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }
}
