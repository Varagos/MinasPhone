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
    const data = JSON.parse(req.body.data);
    const id = req.params.id;
    const { active, slug, name, description, quantity, sku, price } = data;
    let { mediaFileName } = data;

    let newImageUploaded = false;
    if (req.file !== undefined) {
      // new image was uploaded
      // will need to save the new mediaFileName
      mediaFileName = req.file.filename;
      newImageUploaded = true;
      // TODO mark that a new image was uploaded
      // TODO delete the old image,in useCase
    }
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
      newImageUploaded,
    };
    // TODO Clean undefined values from dto

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
