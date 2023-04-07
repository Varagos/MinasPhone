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
import { FindCategoriesDto } from './find-categories.request.dto';
import { PaginatedQueryRequestDto } from '@libs/api/paginated-query.request.dto';
import { FindCategoriesQuery } from './find-categories.query';
import { CategoryPaginatedResponseDto } from '../../dtos/category.paginated.response.dto';
import { CategoryModel } from '@modules/product-catalog/infra/database/category.repository';
import { Paginated } from '@libs/ddd';
import { ResponseBase } from '@libs/api/response.base';
import { routesV1 } from '@config/app.routes';

@Controller(routesV1.version)
export class FindCategoriesHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.category.root)
  @ApiOperation({ summary: 'Find categories' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CategoryPaginatedResponseDto,
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async findUsers(
    @Body() request: FindCategoriesDto,
    @Query() queryParams: PaginatedQueryRequestDto,
  ): Promise<CategoryPaginatedResponseDto> {
    const query = new FindCategoriesQuery({
      ...request,
      limit: queryParams?.limit,
      page: queryParams?.page,
    });
    const result: Result<
      Paginated<CategoryModel>,
      Error
    > = await this.queryBus.execute(query);

    const paginated = result.unwrap();

    // Whitelisting returned properties
    return new CategoryPaginatedResponseDto({
      ...paginated,
      data: paginated.data.map((category) => ({
        ...new ResponseBase({
          id: category.id,
          createdAt: category.created_at,
          updatedAt: category.updated_at,
        }),
        slug: category.slug,
        name: category.name,
        parentId: category.parent_id ?? undefined,
      })),
    });
  }
}
