import { Result } from '../../../../../../shared/core/Result';
import { BaseController } from '../../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../../../shared/infra/http/models/decodedRequest';
import { CreateProduct } from './CreateProduct';
import { CreateProductDTO } from './CreateProductDTO';

export class CreateProductController extends BaseController {
  private useCase: CreateProduct;

  constructor(useCase: CreateProduct) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    try {
      if (!req.file) {
        return this.clientError(res, 'Please upload a valid image');
      }
      // console.log(req.file);
      const data = JSON.parse(req.body.data);
      const {
        active,
        slug,
        name,
        description,
        quantity,
        sku,
        price,
        categoryId,
      } = data;
      const dto: CreateProductDTO = {
        active,
        slug,
        name,
        description,
        quantity,
        mediaFileName: req.file.filename,
        sku,
        price,
        categoryId,
      };
      console.log('dto', dto);
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case Result: {
            // console.log('Result', error.getErrorValue());
            return this.clientError(res, error.getErrorValue() as any);
          }
          default: {
            return this.fail(res, (error as any).getErrorValue().message);
          }
        }
      }
      const id = (result.value as any).getValue();
      return this.ok(res, { id });
    } catch (err: any) {
      console.log({ err });
      return this.fail(res, err);
    }
  }
}
