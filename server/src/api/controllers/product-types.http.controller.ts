import {
  Controller,
  HttpStatus,
  ConflictException as ConflictHttpException,
  Body,
  Post,
  UseGuards,
  BadRequestException,
  Get,
  Query,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  NotFoundException as HttpNotFoundException,
} from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Result, match } from 'oxide.ts';
import { IdResponse } from '@libs/api/id.response.dto';
import { ApiErrorResponse } from '@libs/api/api-error.response';
import { RolesGuard } from '@modules/user-management/user-management.module';
import { CreateProductTypeRequestDto } from '@modules/product-catalog/application/product-types/commands/create-product-type/create-product-type.request.dto';
import { CreateProductTypeCommand } from '@modules/product-catalog/application/product-types/commands/create-product-type/create-product-type.command';
import { CreateProductTypeCommandResponse } from '@modules/product-catalog/application/product-types/commands/create-product-type/create-product-type.handler';
import { DeleteProductTypeCommand } from '@modules/product-catalog/application/product-types/commands/delete-product-type/delete-product-type.command';
import {
  ProductTypeAlreadyExistsError,
  ProductTypeNameEmptyError,
  ProductTypeNameTooLongError,
} from '@modules/product-catalog/domain/product-type.errors';
import { FindProductTypeQuery } from '@modules/product-catalog/application/product-types/queries/find-product-type/find-product-type.query';
import { ProductTypeModel } from '@modules/product-catalog/application/product-types/queries/find-product-type/find-product-type.handler';
import { ProductTypeResponseDto } from '@modules/product-catalog/application/product-types/dtos/product-type.response.dto';
import { FindProductTypesRequestDto } from '@modules/product-catalog/application/product-types/queries/find-product-types/find-product-types.request.dto';
import { FindProductTypesQuery } from '@modules/product-catalog/application/product-types/queries/find-product-types/find-product-types.query';
import { ProductTypeListModel } from '@modules/product-catalog/application/product-types/queries/find-product-types/find-product-types.handler';
import { ProductTypePaginatedResponseDto } from '@modules/product-catalog/application/product-types/dtos/product-type.paginated.response.dto';
import { Paginated } from '@libs/ddd';
import { NotFoundException } from '@libs/exceptions';
import { ResponseBase } from '@libs/api/response.base';
import { DeleteProductTypeCommandResponse } from '@modules/product-catalog/application/product-types/commands/delete-product-type/delete-product-type.handler';
import { UpdateProductTypeRequestDto } from '@modules/product-catalog/application/product-types/commands/update-product-type/update-product-type.request.dto';
import { UpdateProductTypeCommand } from '@modules/product-catalog/application/product-types/commands/update-product-type/update-product-type.command';
import { UpdateProductTypeCommandResponse } from '@modules/product-catalog/application/product-types/commands/update-product-type/update-product-type.handler';

@ApiTags('product-types')
@Controller(routesV1.version)
export class ProductTypesHttpController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({
    summary: 'Create a product type',
    description:
      'This route can only be accessed by admins. It is used to create a new Product Type.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ProductTypeAlreadyExistsError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.productType.root)
  @UseGuards(new RolesGuard())
  async create(@Body() body: CreateProductTypeRequestDto): Promise<IdResponse> {
    const command = new CreateProductTypeCommand({
      ...body,
      attributes: body.attributes
        ? body.attributes.map(({ attributeId, ...config }) => ({
            attributeId,
            config,
          }))
        : [],
    });

    const result: CreateProductTypeCommandResponse =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        if (error instanceof ProductTypeAlreadyExistsError)
          throw new ConflictHttpException(error.message);
        if (error instanceof ProductTypeNameEmptyError)
          throw new BadRequestException(error.message);
        if (error instanceof ProductTypeNameTooLongError)
          throw new BadRequestException(error.message);
        throw error;
      },
    });
  }

  @Get(routesV1.productType.root)
  @ApiOperation({ summary: 'Find product types' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductTypePaginatedResponseDto,
  })
  async findProductTypes(
    @Query() queryParams: FindProductTypesRequestDto,
  ): Promise<ProductTypePaginatedResponseDto> {
    const query = new FindProductTypesQuery({
      limit: queryParams.limit,
      page: queryParams.page,
      name: queryParams.name,
    });

    const result: Result<
      Paginated<ProductTypeListModel>,
      Error
    > = await this.queryBus.execute(query);

    const paginated = result.unwrap();

    // Map ProductTypeModel (from DB) to ProductTypeResponseDto
    return new ProductTypePaginatedResponseDto({
      ...paginated,
      data: paginated.data.map((pt) => ({
        ...new ResponseBase({
          id: pt.id,
          createdAt: pt.created_at,
          updatedAt: pt.updated_at,
        }),
        name: pt.name,
        attributes: pt.attributes,
      })),
    });
  }

  @Get(routesV1.productType.getOne)
  @ApiOperation({ summary: 'Find product type by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductTypeResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ApiErrorResponse, // Changed from ApiResponse to ApiErrorResponse for consistency
  })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductTypeResponseDto> {
    const query = new FindProductTypeQuery({ id });
    const result: Result<ProductTypeModel, Error> = await this.queryBus.execute(
      query,
    );

    return match(result, {
      Ok: (pt) => ({
        ...new ResponseBase({
          id: pt.id,
          createdAt: pt.created_at,
          updatedAt: pt.updated_at,
        }),
        name: pt.name,
        attributes: pt.attributes.map((attr) => ({
          attributeId: attr.attributeId,
          attributeName: attr.attributeName,
          valueType: attr.valueType,
          inputType: attr.inputType,
          unit: attr.unit,
          isRequired: attr.isRequired,
          isFilterable: attr.isFilterable,
          isSearchable: attr.isSearchable,
          displayOrder: attr.displayOrder,
          attributeValues: attr.attributeValues,
        })),
      }),
      Err: (error: Error) => {
        if (error instanceof NotFoundException) {
          throw new HttpNotFoundException();
        }
        throw error;
      },
    });
  }

  @ApiOperation({
    summary: 'Delete a product type',
    description:
      'This route can only be accessed by admins. It is used to delete a Product Type.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Delete(routesV1.productType.delete)
  @UseGuards(new RolesGuard())
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    const command = new DeleteProductTypeCommand({ productTypeId: id });

    const result: DeleteProductTypeCommandResponse =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (deleted: boolean) => deleted,
      Err: (error: Error) => {
        if (error instanceof NotFoundException)
          throw new HttpNotFoundException(error.message);
        throw error;
      },
    });
  }

  @ApiOperation({ summary: 'Update a product type' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product type updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product type not found',
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Put(routesV1.productType.update)
  @UseGuards(new RolesGuard())
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateProductTypeRequestDto,
  ): Promise<boolean> {
    const command = new UpdateProductTypeCommand({
      productTypeId: id,
      name: body.name,
      attributes:
        body.attributes?.map((attr) => ({
          attributeId: attr.attributeId,
          config: {
            isRequired: attr.isRequired,
            isFilterable: attr.isFilterable,
            isSearchable: attr.isSearchable,
            displayOrder: attr.displayOrder,
          },
        })) || [],
    });

    const result: UpdateProductTypeCommandResponse =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (success: boolean) => success,
      Err: (error: Error) => {
        if (error instanceof NotFoundException) {
          throw new HttpNotFoundException(error.message);
        }
        if (
          error instanceof ProductTypeNameEmptyError ||
          error instanceof ProductTypeNameTooLongError
        ) {
          throw new BadRequestException(error.message);
        }
        throw error;
      },
    });
  }
}
