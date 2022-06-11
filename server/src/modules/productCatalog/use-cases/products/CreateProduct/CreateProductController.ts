import * as express from 'express';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../../shared/infra/http/models/decodedRequest';
import { CreateProduct } from './CreateProduct';
import { CreateProductDTO } from './CreateProductDTO';

export class CreateProductController extends BaseController {
  private useCase: CreateProduct;

  constructor(useCase: CreateProduct) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const dto: CreateProductDTO = {
      active: req.body.active,
      permalink: req.body.permalink,
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      media: req.body.media,
      sku: req.body.sku,
      price: req.body.price,
    };
    console.log({ dto });

    try {
      console.log({ dto });
      const result = await this.useCase.execute(dto);
      console.log({ result });

      if (result.isLeft()) {
        const error = result.value;

        return this.fail(res, (error as any).getErrorValue().message);
      } else {
        const id = (result.value as any).getValue();
        return this.ok(res, { id });
      }
    } catch (err: any) {
      console.log({ err });
      return this.fail(res, err);
    }
  }
}
