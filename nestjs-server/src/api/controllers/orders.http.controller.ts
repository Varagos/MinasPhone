import {
  Controller,
  HttpStatus,
  NotFoundException as HttpNotFoundException,
  ConflictException as ConflictHttpException,
  Body,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { match } from 'oxide.ts';
import { IdResponse } from '@libs/api/id.response.dto';
import { CategoryAlreadyExistsError } from '@modules/product-catalog/domain/category.errors';
import { ApiErrorResponse } from '@libs/api/api-error.response';
import { RolesGuard } from '@modules/user-management/user-management.module';
import { CartPrimitives } from '@modules/orders/application/carts/commands/create-cart/create-cart.handler';
import { COOKIE_KEY } from './cart.http.controller';
import { CheckoutOrderRequestDto } from '@modules/orders/application/orders/commands/checkout-order/checkout-order.request.dto';
import { CheckoutOrderCommand } from '@modules/orders/application/orders/commands/checkout-order/checkout-order.command';
import { CheckoutOrderCommandResponse } from '@modules/orders/application/orders/commands/checkout-order/checkout-order.handler';

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

  private extractCartFromCookie(request: Request): CartPrimitives | null {
    const cartCookie = request.cookies[COOKIE_KEY]
      ? JSON.parse(request.cookies[COOKIE_KEY])
      : null;
    return cartCookie;
  }
}
