import { UpdateProduct } from './UpdateProduct.js';
import { BaseController } from '../../../../../../shared/infra/http/models/BaseController.js';
import { DecodedExpressRequest } from '../../../../../../shared/infra/http/models/decodedRequest.js';
import { UpdateProductDTO } from './UpdateProductDTO.js';

export class UpdateProductController extends BaseController {
  private useCase: UpdateProduct;

  constructor(useCase: UpdateProduct) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const data = JSON.parse(req.body.data);
    const id = req.params.id;
    let { mediaFileName } = data;

    let newImageUploaded = false;
    if (req.file !== undefined) {
      mediaFileName = req.file.filename;
      newImageUploaded = true;
    }

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
    const dto: UpdateProductDTO = {
      id,
      active,
      slug,
      name,
      description,
      quantity,
      mediaFileName,
      sku,
      price,
      categoryId,
      newImageUploaded,
    };

    try {
      // console.log({ dto });
      const result = await this.useCase.execute(dto);
      // console.log({ result });

      if (result.isLeft()) {
        const error = result.value;

        return this.fail(res, (error.getErrorValue() as any).message);
      } else {
        return this.ok(res);
      }
    } catch (err: any) {
      // console.log({ err });
      return this.fail(res, err);
    }
  }
}
