import {
  Controller,
  HttpStatus,
  Param,
  NotFoundException as HttpNotFoundException,
  ConflictException as ConflictHttpException,
  ParseUUIDPipe,
  Res,
  BadRequestException,
  Get,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { match } from 'oxide.ts';
import { Response } from 'express';
import { ResponseBase } from '@libs/api/response.base';
import { routesV1 } from '@config/app.routes';
import { FindProductByIdQuery } from '../../modules/product-catalog/application/products/queries/find-product-by-id/find-product-by-id.query';
import { FindCategoryByIdQueryResponse } from '../../modules/product-catalog/application/products/queries/find-product-by-id/find-product-by-id.handler';
import { ArgumentInvalidException, NotFoundException } from '@libs/exceptions';
import { ProductResponseDto } from '@modules/product-catalog/application/categories/dtos/product.response.dto';
import { ProductPaginatedResponseDto } from '@modules/product-catalog/application/categories/dtos/product.paginated.response.dto';
import { FindProductsRequestDto } from '@modules/product-catalog/application/products/queries/find-products/find-products.request.dto';
import { Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { PaginatedQueryRequestDto } from '@libs/api/paginated-query.request.dto';
import { Paginated } from '@libs/ddd';
import { ProductModel } from '@modules/product-catalog/infra/database/product.repository';
import { FindProductsQuery } from '@modules/product-catalog/application/products/queries/find-products/find-products.query';
import { FindProductImageQuery } from '@modules/product-catalog/application/products/queries/find-image/find-product-image.query';
import { IdResponse } from '@libs/api/id.response.dto';
import { ProductAlreadyExistsError } from '@modules/product-catalog/domain/product.errors';
import { ApiErrorResponse } from '@libs/api/api-error.response';
import { CreateProductRequestDto } from '@modules/product-catalog/application/products/commands/create-product/create-product.request.dto';
import { CreateProductCommandResponse } from '@modules/product-catalog/application/products/commands/create-product/create-product.handler';
import { CreateProductCommand } from '@modules/product-catalog/application/products/commands/create-product/create-product.command';
import { DeleteProductCommand } from '@modules/product-catalog/application/products/commands/delete-product/delete-product.command';
import { DeleteProductCommandResponse } from '@modules/product-catalog/application/products/commands/delete-product/delete-product.handler';
import { UpdateProductRequestDto } from '@modules/product-catalog/application/products/commands/update-product/update-product.request.dto';
import { UpdateProductCommand } from '@modules/product-catalog/application/products/commands/update-product/update-product.command';
import { UpdateProductCommandResponse } from '@modules/product-catalog/application/products/commands/update-product/update-product.handler';

@ApiTags('products')
@Controller(routesV1.version)
export class ProductsHttpController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Create a Product' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ProductAlreadyExistsError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.product.root)
  async create(@Body() body: CreateProductRequestDto): Promise<IdResponse> {
    console.log('body', body);
    const command = new CreateProductCommand(body);

    const result: CreateProductCommandResponse = await this.commandBus.execute(
      command,
    );

    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        if (error instanceof ProductAlreadyExistsError)
          throw new ConflictHttpException(error.message);
        if (error instanceof ArgumentInvalidException)
          throw new BadRequestException(error.message);
        if (error instanceof NotFoundException)
          throw new HttpNotFoundException(error.message);
        throw error;
      },
    });
  }

  @ApiOperation({ summary: 'Delete a Product' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ApiErrorResponse,
  })
  @Delete(routesV1.product.delete)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    const command = new DeleteProductCommand(id);

    const result: DeleteProductCommandResponse = await this.commandBus.execute(
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

  @ApiOperation({ summary: 'Update a Product' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Put(routesV1.product.update)
  async updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateProductRequestDto,
  ): Promise<'OK'> {
    const command = new UpdateProductCommand({ ...body, id });

    const result: UpdateProductCommandResponse = await this.commandBus.execute(
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

  @Get(routesV1.product.root)
  @ApiOperation({ summary: 'Find products' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductPaginatedResponseDto,
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async findProducts(
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

  @Get(routesV1.product.getOne)
  @ApiOperation({ summary: 'Find product by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ApiResponse,
  })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductResponseDto> {
    const query = new FindProductByIdQuery({
      id,
    });
    const result: FindCategoryByIdQueryResponse = await this.queryBus.execute(
      query,
    );

    return match(result, {
      Ok: (product) => {
        return {
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

  @Get(routesV1.product.image)
  @ApiOperation({ summary: 'Find product Image' })
  @ApiResponse({
    status: HttpStatus.OK,
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
        res.writeHead(200, {
          'Content-Type': product.image_mimetype,
          'Content-Length': product.image_data.length,
        });
        return res.end(product.image_data);
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
