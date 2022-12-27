import { IAuthProvider } from '../../services/authProvider.js';
import * as express from 'express';
import { BaseController } from '../../../../shared/infra/http/models/BaseController.js';
import { IAuthService } from '../../repositories/userRepo.js';

export class GetAllUsersController extends BaseController {
  private userRepo: IAuthService;
  private authProvider: IAuthProvider;

  constructor(userRepo: IAuthService, authProvider: IAuthProvider) {
    super();
    this.userRepo = userRepo;
    this.authProvider = authProvider;
  }
  protected async executeImpl(
    req: express.Request,
    res: express.Response,
  ): Promise<any> {
    try {
      //   const { username, password, email } = req.body;
      const users = await this.authProvider.getUsers();
      console.log({ users });
      const userValues = users.map((user: any) => user.user);

      return this.ok(res, userValues);
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
