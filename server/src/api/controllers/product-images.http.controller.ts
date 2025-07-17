import {
  Controller,
  HttpStatus,
  NotFoundException as HttpNotFoundException,
  Get,
  NotFoundException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { match } from 'oxide.ts';
import { routesV1 } from '@config/app.routes';
import { FindSearchEngineImagesResponseDto } from '@modules/product-catalog/application/images/queries/find-search-engine-images/find-search-engine-images.response.dto';
import { FindSearchEngineImagesQuery } from '@modules/product-catalog/application/images/queries/find-search-engine-images/find-search-engine-images.query';
import type { FindSearchEngineImagesResponse } from '@modules/product-catalog/application/images/queries/find-search-engine-images/find-search-engine-images.handler';
import { RolesGuard } from '@modules/user-management/user-management.module';
import { FindSearchEngineImagesRequestDto } from '@modules/product-catalog/application/images/queries/find-search-engine-images/find-search-engine-images.request.dto';

@ApiTags('products-images')
@Controller(routesV1.version)
export class ProductImagesHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Find product images from search engine' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FindSearchEngineImagesResponseDto,
  })
  @Get(routesV1.product.searchEngineImages)
  @UseGuards(new RolesGuard())
  async findSearchEngineImages(
    @Query() queryParams: FindSearchEngineImagesRequestDto,
  ): Promise<FindSearchEngineImagesResponseDto> {
    const query = new FindSearchEngineImagesQuery(queryParams.searchText);

    const result: FindSearchEngineImagesResponse = await this.queryBus.execute(
      query,
    );

    return match(result, {
      Ok: (response) => response,
      Err: (error: Error) => {
        if (error instanceof NotFoundException) {
          throw new HttpNotFoundException(error.message);
        }
        throw error;
      },
    });
  }
}
