import { IAuthService } from '../../services/authProvider.js';
import * as express from 'express';
import { BaseController } from '../../../../shared/infra/http/models/BaseController.js';

export class GetAllUsersController extends BaseController {
  private authService: IAuthService;

  constructor(authProvider: IAuthService) {
    super();
    this.authService = authProvider;
  }
  protected async executeImpl(
    req: express.Request,
    res: express.Response,
  ): Promise<any> {
    try {
      //   const { username, password, email } = req.body;
      const users = await this.authService.getUsers();
      console.log({ users });
      const userValues = users.map((user: any) => user.user);

      return this.ok(res, userValues);
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
