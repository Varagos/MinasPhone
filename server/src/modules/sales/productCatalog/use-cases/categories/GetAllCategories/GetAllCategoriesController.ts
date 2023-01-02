import { CategoryDetailsMap } from '../../../mappers/CategoryDetailsMap.js';
import * as express from 'express';
import { BaseController } from '../../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../../shared/infra/http/models/decodedRequest.js';
import { GetAllCategories } from './GetAllCategories.js';
import { GetAllCategoriesResponseDTO } from './GetAllCategoriesResponseDTO.js';

export class GetAllCategoriesController extends BaseController {
  private useCase: GetAllCategories;

  constructor(useCase: GetAllCategories) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    try {
      const result = await this.useCase.execute();
      // console.log({ result });

      if (result.isLeft()) {
        const error = result.value;

        return this.fail(res, (error as any).getErrorValue().message);
      } else {
        const categoryDetails = result.value.getValue();
        return this.ok<GetAllCategoriesResponseDTO>(
          res,
          categoryDetails.map((cat: any) => CategoryDetailsMap.toDTO(cat)),
        );
      }
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }
}