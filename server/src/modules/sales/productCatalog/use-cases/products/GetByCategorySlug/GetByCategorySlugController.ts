import { GetByCategorySlug } from './GetByCategorySlug.js';
import { BaseController } from '../../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../../shared/infra/http/models/decodedRequest.js';
import { GetByCategorySlugResponseDTO } from './GetByCategorySlugResponseDTO.js';
import { ProductDetailsMap } from '../../../mappers/ProductDetailsMap.js';

export class GetByCategorySlugController extends BaseController {
  private useCase: GetByCategorySlug;

  constructor(useCase: GetByCategorySlug) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    try {
      const filter = req.query.filter;
      if (typeof filter !== 'string' || !this.isJsonString(filter)) {
        return this.clientError(res, 'Invalid filter');
      }
      const { category_slug: slug } = JSON.parse(filter);
      const result = await this.useCase.execute({ slug });
      // console.log({ result });

      if (result.isLeft()) {
        const error = result.value;

        return this.fail(res, (error as any).getErrorValue().message);
      } else {
        const productDetails = result.value.getValue();
        return this.ok<GetByCategorySlugResponseDTO>(
          res,
          productDetails.map((prod) => ProductDetailsMap.toDTO(prod)),
        );
      }
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }

  private isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}
