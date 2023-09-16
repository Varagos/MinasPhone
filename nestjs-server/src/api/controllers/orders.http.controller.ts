import {
  Controller,
  HttpStatus,
  NotFoundException as HttpNotFoundException,
  ConflictException as ConflictHttpException,
  Body,
  Post,
  Get,
  UseGuards,
  Req,
  ParseUUIDPipe,
  Param,
  UsePipes,
  ValidationPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Result, match } from 'oxide.ts';
import { IdResponse } from '@libs/api/id.response.dto';
import { CategoryAlreadyExistsError } from '@modules/product-catalog/domain/category.errors';
import { ApiErrorResponse } from '@libs/api/api-error.response';
import { RolesGuard } from '@modules/user-management/user-management.module';
import { CartPrimitives } from '@modules/orders/application/carts/commands/create-cart/create-cart.handler';
import { COOKIE_KEY } from './cart.http.controller';
import { CheckoutOrderRequestDto } from '@modules/orders/application/orders/commands/checkout-order/checkout-order.request.dto';
import { CheckoutOrderCommand } from '@modules/orders/application/orders/commands/checkout-order/checkout-order.command';
import { CheckoutOrderCommandResponse } from '@modules/orders/application/orders/commands/checkout-order/checkout-order.handler';
import { OrderResponseDto } from '@modules/orders/application/orders/dtos/order.response.dto';
import { FindOrderByIdQueryResponse } from '@modules/orders/application/orders/queries/find-order-by-id/find-order-by-id.handler';
import { FindOrderByIdQuery } from '@modules/orders/application/orders/queries/find-order-by-id/find-order-by-id.query';
import { ResponseBase } from '@libs/api/response.base';
import { NotFoundException } from '@libs/exceptions';
import { FindOrderBySlugQueryResponse } from '@modules/orders/application/orders/queries/find-order-by-slug/find-order-by-slug.handler';
import { FindOrderBySlugQuery } from '@modules/orders/application/orders/queries/find-order-by-slug/find-order-by-slug.query';
import { OrderPaginatedResponseDto } from '@modules/orders/application/orders/dtos/order.paginated.response.dto';
import { PaginatedQueryRequestDto } from '@libs/api/paginated-query.request.dto';
import { FindOrdersQueryDto } from '@modules/orders/application/orders/queries/find-orders/find-orders.request.dto';
import { FindOrdersQuery } from '@modules/orders/application/orders/queries/find-orders/find-orders.query';
import { Paginated } from '@libs/ddd';
import { CategoryModel } from '@modules/product-catalog/infra/database/category.repository';
import { OrderModel } from '@modules/orders/infra/database/order.repository';

@ApiTags('orders')
@Controller(routesV1.version)
export class OrdersHttpController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  // TODO make this request idempotent
  @ApiOperation({
    summary: 'Checkout Order',
    description: 'Checkout Order',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.order.checkout)
  async create(
    @Req() request: Request,
    @Body() body: CheckoutOrderRequestDto,
  ): Promise<IdResponse> {
    const cartCookie = this.extractCartFromCookie(request);
    if (cartCookie === null) throw new HttpNotFoundException('Cart not found');

    const { lineItems } = cartCookie;
    const orderRequestLineItems = lineItems.map((lineItem) => ({
      productId: lineItem.productId,
      quantity: lineItem.quantity,
    }));

    const { firstName, lastName, email, phone } = body;
    const contactInfo = {
      firstName,
      lastName,
      email,
      phone,
    };
    const command = new CheckoutOrderCommand(
      orderRequestLineItems,
      contactInfo,
    );

    const result: CheckoutOrderCommandResponse = await this.commandBus.execute(
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

  @Get(routesV1.order.getOne)
  @ApiOperation({ summary: 'Find category by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ApiResponse,
  })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<OrderResponseDto> {
    const query = new FindOrderByIdQuery({
      id,
    });
    const result: FindOrderByIdQueryResponse = await this.queryBus.execute(
      query,
    );

    return match(result, {
      Ok: (order): OrderResponseDto => {
        return {
          ...new ResponseBase({
            id: order.id,
            createdAt: order.created_at,
            updatedAt: order.updated_at,
          }),
          slug: order.slug,
          status: order.status,
          lineItems: order.line_items.map((lineItem) => ({
            id: lineItem.id,
            productId: lineItem.product_id,
            productName: lineItem.product_name,
            productImage: lineItem.product_image,
            itemPrice: lineItem.item_price,
            totalPrice: lineItem.total_price,
            quantity: lineItem.quantity,
          })),
          contactInfo: {
            firstName: order.first_name,
            lastName: order.last_name,
            email: order.email,
            phone: order.phone,
          },
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

  @Get(routesV1.order.getOneBySlug)
  @ApiOperation({ summary: 'Find category by slug' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ApiResponse,
  })
  async findOneBySlug(@Param('slug') slug: string): Promise<OrderResponseDto> {
    const query = new FindOrderBySlugQuery({
      slug,
    });
    const result: FindOrderBySlugQueryResponse = await this.queryBus.execute(
      query,
    );

    return match(result, {
      Ok: (order): OrderResponseDto => {
        return {
          ...new ResponseBase({
            id: order.id,
            createdAt: order.created_at,
            updatedAt: order.updated_at,
          }),
          slug: order.slug,
          status: order.status,
          lineItems: order.line_items.map((lineItem) => ({
            id: lineItem.id,
            productId: lineItem.product_id,
            productName: lineItem.product_name,
            productImage: lineItem.product_image,
            itemPrice: lineItem.item_price,
            totalPrice: lineItem.total_price,
            quantity: lineItem.quantity,
          })),
          contactInfo: {
            firstName: order.first_name,
            lastName: order.last_name,
            email: order.email,
            phone: order.phone,
          },
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

  @Get(routesV1.order.root)
  @ApiOperation({ summary: 'Find orders' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderPaginatedResponseDto,
  })
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      // transform: true,
      // transformOptions: { enableImplicitConversion: true },
      // forbidNonWhitelisted: true,
    }),
  )
  async findOrders(
    @Query() queryParams: FindOrdersQueryDto,
  ): Promise<OrderPaginatedResponseDto> {
    console.log({ queryParams });
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
    console.log({
      start,
      end,
      limit,
      page,
    });
    const query = new FindOrdersQuery({
      ...filter,
      limit,
      page,
      orderBy: sort && {
        field: sort[0],
        param: sort[1] === 'ASC' ? 'asc' : 'desc',
      },
    });
    const result: Result<
      Paginated<OrderModel>,
      Error
    > = await this.queryBus.execute(query);

    const paginated = result.unwrap();

    // Whitelisting returned properties
    return new OrderPaginatedResponseDto({
      ...paginated,
      data: paginated.data.map((order) => ({
        ...new ResponseBase({
          id: order.id,
          createdAt: order.created_at,
          updatedAt: order.updated_at,
        }),
        slug: order.slug,
        status: order.status,
        lineItems: order.line_items.map((lineItem) => ({
          id: lineItem.id,
          productId: lineItem.product_id,
          productName: lineItem.product_name,
          productImage: lineItem.product_image,
          itemPrice: lineItem.item_price,
          totalPrice: lineItem.total_price,
          quantity: lineItem.quantity,
        })),
        contactInfo: {
          firstName: order.first_name,
          lastName: order.last_name,
          email: order.email,
          phone: order.phone,
        },
      })),
    });
    return 'OK' as any;
  }

  private extractCartFromCookie(request: Request): CartPrimitives | null {
    const cartCookie = request.cookies[COOKIE_KEY]
      ? JSON.parse(request.cookies[COOKIE_KEY])
      : null;
    return cartCookie;
  }
}
