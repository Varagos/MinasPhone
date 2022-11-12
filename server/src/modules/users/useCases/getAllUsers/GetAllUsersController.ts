import { IAuthProvider } from './../../services/authProvider';
import * as express from 'express';
import { BaseController } from '../../../../shared/infra/http/models/BaseController';
import { IUserRepo } from '../../repos/implementations/userRepo';

export class GetAllUsersController extends BaseController {
  private userRepo: IUserRepo;
  private authProvider: IAuthProvider;

  constructor(userRepo: IUserRepo, authProvider: IAuthProvider) {
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

      return this.ok(res, { users });
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
