import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Res,
  UsePipes,
  ValidationPipe,
  NotFoundException as HttpNotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Result, match } from 'oxide.ts';
import { FindProductImageQuery } from './find-products.query';
import { routesV1 } from '@config/app.routes';
import { ProductPaginatedResponseDto } from '@modules/product-catalog/application/categories/dtos/product.paginated.response.dto';
import { ProductModel } from '@modules/product-catalog/infra/database/product.repository';
import { NotFoundException } from '@libs/exceptions';

@Controller(routesV1.version)
export class FindProductImageHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.product.image)
  @ApiOperation({ summary: 'Find products' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductPaginatedResponseDto,
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async findImage(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const query = new FindProductImageQuery(id);
    const result: Result<ProductModel, Error> = await this.queryBus.execute(
      query,
    );

    return match(result, {
      Ok: (product) => {
        /**TEMP */
        res.writeHead(200, {
          'Content-Type': product.image_mimetype,
          'Content-Length': product.image_data.length,
        });
        return res.end(product.image_data);

        //**TEMPO */
        // console.log(imageData);
        // const base64EncodedString = imageData.toString('utf-8');
        // // console.log(base64EncodedString);

        // const matches = base64EncodedString.match(
        //   /^data:([A-Za-z-+\/]+);base64,(.+)$/,
        // )!;
        // const mimeType = matches[1]; // extract the mime type
        // const base64Data = matches[2]; // extract the base64-encoded data

        // const data = base64EncodedString.split(',')[1];
        // const img = Buffer.from(base64Data, 'base64');
        // res.writeHead(200, {
        //   'Content-Type': mimeType ?? 'image/jpeg',
        //   'Content-Length': img.length,
        // });
        // return res.end(img);
      },
      Err: (error: Error) => {
        if (error instanceof NotFoundException) {
          throw new HttpNotFoundException();
        }
        throw error;
      },
    });
  }
}
