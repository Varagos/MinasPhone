import { CreateCategory } from './CreateCategory';
import * as express from 'express';
import { BaseController } from '../../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../../../shared/infra/http/models/decodedRequest';
import { CreateCategoryDTO } from './CreateCategoryDTO';

export class CreateCategoryController extends BaseController {
  private useCase: CreateCategory;

  constructor(useCase: CreateCategory) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const dto: CreateCategoryDTO = {
      slug: req.body.slug,
      name: req.body.name,
    };

    try {
      // console.log({ dto });
      const result = await this.useCase.execute(dto);
      // console.log({ result });

      if (result.isLeft()) {
        const error = result.value;

        return this.fail(res, (error as any).getErrorValue().message);
      } else {
        const id = (result.value as any).getValue();
        return this.ok(res, { id });
      }
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }
}
