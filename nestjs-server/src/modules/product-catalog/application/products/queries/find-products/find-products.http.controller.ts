import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Result } from 'oxide.ts';
import { FindProductsRequestDto } from './find-products.request.dto';
import { PaginatedQueryRequestDto } from '@libs/api/paginated-query.request.dto';
import { FindProductsQuery } from './find-products.query';
import { Paginated } from '@libs/ddd';
import { ResponseBase } from '@libs/api/response.base';
import { routesV1 } from '@config/app.routes';
import { ProductPaginatedResponseDto } from '@modules/product-catalog/application/categories/dtos/product.paginated.response.dto';
import { ProductModel } from '@modules/product-catalog/infra/database/product.repository';

@Controller(routesV1.version)
export class FindProductsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.product.root)
  @ApiOperation({ summary: 'Find products' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductPaginatedResponseDto,
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async findUsers(
    @Body() request: FindProductsRequestDto,
    @Query() queryParams: PaginatedQueryRequestDto,
  ): Promise<ProductPaginatedResponseDto> {
    const query = new FindProductsQuery({
      ...request,
      limit: queryParams?.limit,
      page: queryParams?.page,
    });
    const result: Result<
      Paginated<ProductModel>,
      Error
    > = await this.queryBus.execute(query);

    const paginated = result.unwrap();

    // Whitelisting returned properties
    return new ProductPaginatedResponseDto({
      ...paginated,
      data: paginated.data.map((product) => ({
        ...new ResponseBase({
          id: product.id,
          createdAt: product.created_at,
          updatedAt: product.updated_at,
        }),
        slug: product.slug,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        active: product.active,
        categoryId: product.category_id,
      })),
    });
  }
}
