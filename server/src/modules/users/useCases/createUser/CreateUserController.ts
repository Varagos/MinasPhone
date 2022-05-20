import * as express from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { BaseController } from '../../../../shared/infra/http/models/BaseController';
interface IUserRepo {
  a: string;
}
export class CreateUserController extends BaseController {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    super();
    this.userRepo = userRepo;
  }
  protected async executeImpl(
    req: express.Request,
    res: express.Response,
  ): Promise<any> {
    try {
      const { username, password, email } = req.body;

      const result: any = 'OK';
      if (result.isFailure) {
        // Send back a 400 client error
        return this.clientError(res, result.error);
      }

      // ... continue
      return this.ok<any>(res);

      // ... Handle request by creating objects
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
