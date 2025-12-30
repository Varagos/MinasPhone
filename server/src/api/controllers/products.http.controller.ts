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
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { match } from 'oxide.ts';
import { Response } from 'express';
import { ResponseBase } from '@libs/api/response.base';
import { routesV1 } from '@config/app.routes';
import { FindProductByIdQuery } from '../../modules/product-catalog/application/products/queries/find-product-by-id/find-product-by-id.query';
import { FindProductByIdQueryResponse } from '../../modules/product-catalog/application/products/queries/find-product-by-id/find-product-by-id.handler';
import { ArgumentInvalidException, NotFoundException } from '@libs/exceptions';
import { ProductResponseDto } from '@modules/product-catalog/application/categories/dtos/product.response.dto';
import {
  ProductPaginatedResponseDto,
  ProductSlugsPaginatedResponseDto,
} from '@modules/product-catalog/application/categories/dtos/product.paginated.response.dto';
import { FindProductsQueryDto } from '@modules/product-catalog/application/products/queries/find-products/find-products.request.dto';
import { Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { PaginatedQueryRequestDto } from '@libs/api/paginated-query.request.dto';
import { Paginated } from '@libs/ddd';
import {
  ProductModel,
  ProductSitemapModel,
} from '@modules/product-catalog/infra/database/product.repository';
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
import { UploadImageCommand } from '@modules/product-catalog/application/images/commands/upload-image/upload-image.command';
import { UploadImageCommandResponse } from '@modules/product-catalog/application/images/commands/upload-image/upload-image.handler';
import { RolesGuard } from '@modules/user-management/user-management.module';
import { FindProductsByCategorySlugQuery } from '@modules/product-catalog/application/products/queries/find-products-by-category-slug/find-products-by-category-slug.query';
import { FindAllProductSlugsQueryDto } from '@modules/product-catalog/application/products/queries/find-all-product-slugs/find-all-product-slugs.request.dto';
import { FindAllProductSlugsQuery } from '@modules/product-catalog/application/products/queries/find-all-product-slugs/find-all-product-slugs.query';
import { ProductSlugResponseDto } from '@modules/product-catalog/application/categories/dtos/product-slug.response.dto';
import { FindSearchEngineImagesResponseDto } from '@modules/product-catalog/application/images/queries/find-search-engine-images/find-search-engine-images.response.dto';
import { FindSearchEngineImagesQuery } from '@modules/product-catalog/application/images/queries/find-search-engine-images/find-search-engine-images.query';
import type { FindSearchEngineImagesResponse } from '@modules/product-catalog/application/images/queries/find-search-engine-images/find-search-engine-images.handler';

@ApiTags('products')
@Controller(routesV1.version)
export class ProductsHttpController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({
    summary: 'Create a Product',
    description:
      'This route can only be accessed by admins. It is used to create a product.',
  })
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
  @UseGuards(new RolesGuard())
  async create(@Body() body: CreateProductRequestDto): Promise<IdResponse> {
    const { image, ...rest } = body;
    const uploadImageCommand = new UploadImageCommand({
      image,
    });

    const uploadImageResult: UploadImageCommandResponse =
      await this.commandBus.execute(uploadImageCommand);
    // match and if error return prematurely
    const imageUrl = match(uploadImageResult, {
      Ok: (image: string) => image,
      Err: (error: Error) => {
        if (error instanceof ArgumentInvalidException)
          throw new BadRequestException(error.message);
        throw error;
      },
    });

    const command = new CreateProductCommand({
      ...rest,
      productTypeId: body.productTypeId,
      attributeValues: body.attributeValues || {},
      imageUri: imageUrl,
    });

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

  @ApiOperation({
    summary: 'Delete a Product',
    description:
      'This route can only be accessed by admins. It is used to delete a product.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ApiErrorResponse,
  })
  @Delete(routesV1.product.delete)
  @UseGuards(new RolesGuard())
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

  @ApiOperation({
    summary: 'Update a Product',
    description:
      'This route can only be accessed by admins. It is used to update a product.',
  })
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
  @UseGuards(new RolesGuard())
  async updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateProductRequestDto,
  ): Promise<'OK'> {
    const { image: imageBase64EncodedString, ...rest } = body;
    let imageUri: string | undefined;
    if (imageBase64EncodedString) {
      const uploadImageCommand = new UploadImageCommand({
        image: imageBase64EncodedString,
      });

      const uploadImageResult: UploadImageCommandResponse =
        await this.commandBus.execute(uploadImageCommand);
      // match and if error return prematurely
      const imageUrl = match(uploadImageResult, {
        Ok: (image: string) => image,
        Err: (error: Error) => {
          if (error instanceof ArgumentInvalidException)
            throw new BadRequestException(error.message);
          throw error;
        },
      });
      imageUri = imageUrl;
    }

    const command = new UpdateProductCommand({ ...rest, imageUri, id });

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
    @Query() queryParams: FindProductsQueryDto, // PaginatedQueryRequestDto,
  ): Promise<ProductPaginatedResponseDto> {
    const { range, sort, filter } = queryParams;
    const start = range?.[0];
    const end = range?.[1];
    const limit =
      start !== undefined && end !== undefined ? end - start + 1 : undefined;
    if (start !== undefined && limit !== undefined && start % limit !== 0) {
      throw new BadRequestException(
        'Invalid range, does not align to a full page',
      );
    }

    const page =
      start !== undefined && limit !== undefined ? start / limit : undefined;

    const query = new FindProductsQuery({
      ...filter,
      limit,
      page,
      orderBy: sort && {
        field: sort[0],
        param: sort[1] === 'ASC' ? 'asc' : 'desc',
      },
      // limit: queryParams?.limit,
      // page: queryParams?.page,
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
        imageUrl: product.image_uri,
        categoryId: product.category_id,
        productTypeId: product.product_type_id ?? undefined,
      })),
    });
  }

  @Get(routesV1.product.findAllSlugs)
  @ApiOperation({ summary: 'Find all product slugs for Sitemap' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductSlugsPaginatedResponseDto,
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async findAllProductSlugs(): Promise<ProductSlugsPaginatedResponseDto> {
    const query = new FindAllProductSlugsQuery();

    const result: Result<
      Paginated<ProductSitemapModel>,
      Error
    > = await this.queryBus.execute(query);

    const paginated = result.unwrap();

    // Whitelisting returned properties
    return new ProductSlugsPaginatedResponseDto({
      ...paginated,
      data: paginated.data.map(
        (product) =>
          new ProductSlugResponseDto({
            id: product.id,
            updatedAt: product.updated_at,
            slug: product.slug,
          }),
      ),
    });
  }

  // @Get(routesV1.product.findByCategorySlug)
  // @ApiOperation({ summary: 'Find products by Category Slug' })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   type: ProductPaginatedResponseDto,
  // })
  // @UsePipes(new ValidationPipe({ whitelist: true }))
  // async findProductsByCategorySlug(
  //   @Param('slug') slug: string,
  //   @Query() queryParams: PaginatedQueryRequestDto,
  // ): Promise<ProductPaginatedResponseDto> {
  //   const query = new FindProductsByCategorySlugQuery({
  //     slug,
  //     limit: queryParams?.limit,
  //     page: queryParams?.page,
  //   });
  //   const result: Result<
  //     Paginated<ProductModel>,
  //     Error
  //   > = await this.queryBus.execute(query);

  //   const paginated = result.unwrap();

  //   // Whitelisting returned properties
  //   return new ProductPaginatedResponseDto({
  //     ...paginated,
  //     data: paginated.data.map((product) => ({
  //       ...new ResponseBase({
  //         id: product.id,
  //         createdAt: product.created_at,
  //         updatedAt: product.updated_at,
  //       }),
  //       slug: product.slug,
  //       name: product.name,
  //       description: product.description,
  //       price: product.price,
  //       quantity: product.quantity,
  //       active: product.active,
  //       imageUrl: product.image_uri,
  //       categoryId: product.category_id,
  //     })),
  //   });
  // }

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
    const result: FindProductByIdQueryResponse = await this.queryBus.execute(
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
          imageUrl: product.image_uri,
          categoryId: product.category_id,
          productTypeId: product.product_type_id ?? undefined,
          attributeValues: product.attribute_values
            ? Object.entries(product.attribute_values).reduce(
                (acc, [attrId, values]) => {
                  acc[attrId] = values.map((v) => ({
                    valueId: v.value_id,
                    textValue: v.text_value,
                    numericValue: v.numeric_value,
                    booleanValue: v.boolean_value,
                  }));
                  return acc;
                },
                {} as Record<
                  string,
                  Array<{
                    valueId: string | null;
                    textValue: string | null;
                    numericValue: number | null;
                    booleanValue: boolean | null;
                  }>
                >,
              )
            : undefined,
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
