import { UpdateProduct } from './UpdateProduct';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest';
import { UpdateProductDTO } from './UpdateProductDTO';

export class UpdateProductController extends BaseController {
  private useCase: UpdateProduct;

  constructor(useCase: UpdateProduct) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const dto: UpdateProductDTO = {
      id: req.params.id,
      active: req.body.active,
      permalink: req.body.permalink,
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      media: req.body.media,
      sku: req.body.sku,
      price: req.body.price,
    };

    try {
      // console.log({ dto });
      const result = await this.useCase.execute(dto);
      // console.log({ result });

      if (result.isLeft()) {
        const error = result.value;

        return this.fail(res, (error as any).getErrorValue().message);
      } else {
        return this.ok(res);
      }
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }
}
