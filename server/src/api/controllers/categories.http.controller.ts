import {
  Controller,
  HttpStatus,
  Param,
  NotFoundException as HttpNotFoundException,
  ConflictException as ConflictHttpException,
  Delete,
  ParseUUIDPipe,
  Body,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  Query,
  Get,
  UseGuards,
} from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Result, match } from 'oxide.ts';
import { IdResponse } from '@libs/api/id.response.dto';
import { CategoryAlreadyExistsError } from '@modules/product-catalog/domain/category.errors';
import { ApiErrorResponse } from '@libs/api/api-error.response';
import { DeleteCategoryCommand } from '../../modules/product-catalog/application/categories/commands/delete-category/delete-category.command';
import { DeleteCategoryCommandResponse } from '../../modules/product-catalog/application/categories/commands/delete-category/delete-category.handler';
import { NotFoundException } from '@libs/exceptions';
import { CreateCategoryRequestDto } from '@modules/product-catalog/application/categories/commands/create-category/create-category.request.dto';
import { CreateCategoryCommand } from '@modules/product-catalog/application/categories/commands/create-category/create-category.command';
import { CreateCategoryCommandResponse } from '@modules/product-catalog/application/categories/commands/create-category/create-category.handler';
import { UpdateCategoryRequestDto } from '@modules/product-catalog/application/categories/commands/update-category/update-category.request.dto';
import { UpdateCategoryCommand } from '@modules/product-catalog/application/categories/commands/update-category/update-category.command';
import { UpdateCategoryCommandResponse } from '@modules/product-catalog/application/categories/commands/update-category/update-category.handler';
import { CategoryPaginatedResponseDto } from '@modules/product-catalog/application/categories/dtos/category.paginated.response.dto';
import { FindCategoriesDto } from '@modules/product-catalog/application/categories/queries/find-categories/find-categories.request.dto';
import { PaginatedQueryRequestDto } from '@libs/api/paginated-query.request.dto';
import { FindCategoriesQuery } from '@modules/product-catalog/application/categories/queries/find-categories/find-categories.query';
import { Paginated } from '@libs/ddd';
import { CategoryModel } from '@modules/product-catalog/infra/database/category.repository';
import { ResponseBase } from '@libs/api/response.base';
import { FindCategoryByIdQueryResponse } from '@modules/product-catalog/application/categories/queries/find-category-by-id/find-category-by-id.handler';
import { FindCategoryByIdQuery } from '@modules/product-catalog/application/categories/queries/find-category-by-id/find-category-by-id.query';
import { CategoryResponseDto } from '@modules/product-catalog/application/categories/dtos/category.response.dto';
import {
  RolesGuard,
  Session,
} from '@modules/user-management/user-management.module';
import { SessionContainer } from 'supertokens-node/recipe/session';

@ApiTags('categories')
@Controller(routesV1.version)
export class CategoriesHttpController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({
    summary: 'Create a Category',
    description:
      'This route can only be accessed by admins. It is used to create a new Category.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: CategoryAlreadyExistsError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.category.root)
  @UseGuards(new RolesGuard())
  async create(@Body() body: CreateCategoryRequestDto): Promise<IdResponse> {
    const { slug, name, parentId = null } = body;
    const command = new CreateCategoryCommand(slug, name, parentId);

    const result: CreateCategoryCommandResponse = await this.commandBus.execute(
      command,
    );

    // Deciding what to do with a Result (similar to Rust matching)
    // if Ok we return a response with an id
    // if Error decide what to do with it depending on its type
    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        if (error instanceof CategoryAlreadyExistsError)
          throw new ConflictHttpException(error.message);
        throw error;
      },
    });
  }

  @ApiOperation({
    summary: 'Update a Category',
    description:
      'This route can only be accessed by admins. It is used to update a Category.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: CategoryAlreadyExistsError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Put(routesV1.category.update)
  @UseGuards(new RolesGuard())
  async updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCategoryRequestDto,
  ): Promise<'OK'> {
    const { parentId = null, ...rest } = body;
    const command = new UpdateCategoryCommand({ ...rest, parentId, id });

    const result: UpdateCategoryCommandResponse = await this.commandBus.execute(
      command,
    );

    return match(result, {
      Ok: () => 'OK',
      Err: (error: Error) => {
        if (error instanceof NotFoundException)
          throw new HttpNotFoundException(error.message);
        throw error;
      },
    });
  }

  @ApiOperation({
    summary: 'Delete a category',
    description:
      'This route can only be accessed by admins. It is used to delete a Category.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: CategoryAlreadyExistsError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Delete(routesV1.category.delete)
  @UseGuards(new RolesGuard())
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    const command = new DeleteCategoryCommand(id);

    const result: DeleteCategoryCommandResponse = await this.commandBus.execute(
      command,
    );

    return match(result, {
      Ok: (deleted: boolean) => deleted,
      Err: (error: Error) => {
        if (error instanceof NotFoundException)
          throw new HttpNotFoundException(error.message);
        throw error;
      },
    });
  }

  @Get(routesV1.category.root)
  @ApiOperation({ summary: 'Find categories' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CategoryPaginatedResponseDto,
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async findCategories(
    @Body() request: FindCategoriesDto,
    @Query() queryParams: PaginatedQueryRequestDto,
  ): Promise<CategoryPaginatedResponseDto> {
    // console.log({ request });
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
        parentId: category.parent_id,
      })),
    });
  }

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
