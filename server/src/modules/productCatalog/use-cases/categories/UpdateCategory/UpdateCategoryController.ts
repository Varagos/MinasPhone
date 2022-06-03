import { UpdateCategory } from './UpdateCategory';
import * as express from 'express';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest';
import { UpdateCategoryDTO } from './UpdateCategoryDTO';

export class UpdateCategoryController extends BaseController {
  private useCase: UpdateCategory;

  constructor(useCase: UpdateCategory) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const dto: UpdateCategoryDTO = {
      id: req.params.id,
      slug: req.body.slug,
      name: req.body.name,
      parentId: req.body.parent_id,
    };

    try {
      console.log({ dto });
      const result = await this.useCase.execute(dto);
      console.log({ result });

      if (result.isLeft()) {
        const error = result.value;

        return this.fail(res, (error as any).getErrorValue().message);
      } else {
        return this.ok(res);
      }
    } catch (err: any) {
      console.log({ err });
      return this.fail(res, err);
    }
  }
}