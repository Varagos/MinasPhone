import {
  Controller,
  Get,
  HttpStatus,
  Param,
  NotFoundException as HttpNotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { match } from 'oxide.ts';
import { ResponseBase } from '@libs/api/response.base';
import { routesV1 } from '@config/app.routes';
import { CategoryResponseDto } from '../../dtos/category.response.dto';
import { FindCategoryByIdQuery } from './find-category-by-id.query';
import { FindCategoryByIdQueryResponse } from './find-category-by-id.handler';
import { NotFoundException } from '@libs/exceptions';

@Controller(routesV1.version)
export class FindCategoryByIdHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.category.getOne)
  @ApiOperation({ summary: 'Find category by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CategoryResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ApiResponse,
  })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CategoryResponseDto> {
    const query = new FindCategoryByIdQuery({
      id,
    });
    const result: FindCategoryByIdQueryResponse = await this.queryBus.execute(
      query,
    );

    return match(result, {
      Ok: (category) => {
        return {
          ...new ResponseBase({
            id: category.id,
            createdAt: category.created_at,
            updatedAt: category.updated_at,
          }),
          slug: category.slug,
          name: category.name,
          parentId: category.parent_id,
        };
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
