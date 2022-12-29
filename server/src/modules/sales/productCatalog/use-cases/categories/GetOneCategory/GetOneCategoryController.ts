import { CategoryDetailsMap } from '../../../mappers/CategoryDetailsMap.js';
import { BaseController } from '../../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../../shared/infra/http/models/decodedRequest.js';
import { GetOneCategory } from './GetOneCategory.js';
import { GetOneCategoryResponseDTO } from './GetOneCategoryResponseDTO.js';

export class GetOneCategoryController extends BaseController {
  private useCase: GetOneCategory;

  constructor(useCase: GetOneCategory) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    try {
      const dto = { id: req.params.id };
      const result = await this.useCase.execute(dto);
      // console.log({ result });

      if (result.isLeft()) {
        const error = result.value;

        return this.fail(res, (error as any).getErrorValue().message);
      } else {
        const categoryDetails = result.value.getValue();
        return this.ok<GetOneCategoryResponseDTO>(
          res,
          CategoryDetailsMap.toDTO(categoryDetails),
        );
      }
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }
}
