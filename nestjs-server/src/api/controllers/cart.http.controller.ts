import {
  Controller,
  HttpStatus,
  Param,
  NotFoundException as HttpNotFoundException,
  Delete,
  ParseUUIDPipe,
  Body,
  Post,
  Put,
  Req,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { match } from 'oxide.ts';
import { IdResponse } from '@libs/api/id.response.dto';
import { CategoryAlreadyExistsError } from '@modules/product-catalog/domain/category.errors';
import { ApiErrorResponse } from '@libs/api/api-error.response';
import {
  ArgumentOutOfRangeException,
  NotFoundException,
} from '@libs/exceptions';
import { ResponseBase } from '@libs/api/response.base';
import { FetchCartQuery } from '@modules/orders/application/carts/queries/fetch-cart/fetch-cart.query';
import { FetchCartQueryResponse } from '@modules/orders/application/carts/queries/fetch-cart/fetch-cart.handler';
import { CartResponseDto } from '@modules/orders/application/carts/dtos/cart.response.dto';
import { CreateCartCommand } from '@modules/orders/application/carts/commands/create-cart/create-cart.command';
import {
  CartPrimitives,
  CreateCartCommandResponse,
} from '@modules/orders/application/carts/commands/create-cart/create-cart.handler';
import { AddCartItemRequestDto } from '@modules/orders/application/carts/commands/add-line-item/add-cart-line-item.request.dto';
import { AddCartLineItemCommand } from '@modules/orders/application/carts/commands/add-line-item/add-cart-line-item.command';
import { AddCartLineItemCommandResponse } from '@modules/orders/application/carts/commands/add-line-item/add-cart-line-item.handler';
import { RemoveCartLineItemCommand } from '@modules/orders/application/carts/commands/remove-line-item/remove-cart-line-item.command';
import { RemoveCartLineItemCommandResponse } from '@modules/orders/application/carts/commands/remove-line-item/remove-cart-line-item.handler';
import { UpdateCartLineItemCommand } from '@modules/orders/application/carts/commands/update-cart/update-cart-line-item.command';
import { UpdateCartLineItemRequestDto } from '@modules/orders/application/carts/commands/update-cart/update-cart-line-item.request.dto';
import { UpdateCartLineItemCommandResponse } from '@modules/orders/application/carts/commands/update-cart/update-cart-line-item.handler';

const COOKIE_KEY = 'cart';

@ApiTags('cart')
@Controller(routesV1.version)
export class CartHttpController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({
    summary: 'Add cart line item',
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
  @Post(routesV1.cart.addLineItem)
  async updateOne(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() body: AddCartItemRequestDto,
  ): Promise<string> {
    const cartCookie = this.extractCartFromCookie(request);
    if (cartCookie === null) throw new HttpNotFoundException('Cart not found');

    const command = new AddCartLineItemCommand({
      productId: body.productId,
      quantity: +body.quantity,
      cart: cartCookie,
    });

    const result: AddCartLineItemCommandResponse =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (cart) => {
        this.setCartCookie(response, cart);
        return 'OK';
      },
      Err: (error: Error) => {
        if (error instanceof NotFoundException)
          throw new HttpNotFoundException(error.message);
        if (error instanceof ArgumentOutOfRangeException)
          throw new BadRequestException(error.message);
        throw error;
      },
    });
  }

  @ApiOperation({
    summary: 'Delete a cart line item',
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
  @Delete(routesV1.cart.deleteLineItem)
  async delete(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    const cartCookie = this.extractCartFromCookie(request);
    if (cartCookie === null) throw new HttpNotFoundException('Cart not found');

    const command = new RemoveCartLineItemCommand({
      id,
      cart: cartCookie,
    });

    const result: RemoveCartLineItemCommandResponse =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (updatedCart) => {
        this.setCartCookie(response, updatedCart);
        return true;
      },
      Err: (error: Error) => {
        if (error instanceof NotFoundException)
          throw new HttpNotFoundException(error.message);
        throw error;
      },
    });
  }

  @ApiOperation({
    summary: 'Update a cart line item',
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
  @Put(routesV1.cart.updateLineItem)
  async updateLineItem(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCartLineItemRequestDto,
  ): Promise<void> {
    const cartCookie = this.extractCartFromCookie(request);
    if (cartCookie === null) throw new HttpNotFoundException('Cart not found');

    const command = new UpdateCartLineItemCommand({
      id,
      quantity: +body.quantity,
      cart: cartCookie,
    });

    const result: UpdateCartLineItemCommandResponse =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (updatedCart) => {
        this.setCartCookie(response, updatedCart);
      },
      Err: (error: Error) => {
        if (error instanceof NotFoundException)
          throw new HttpNotFoundException(error.message);
        if (error instanceof ArgumentOutOfRangeException)
          throw new BadRequestException(error.message);
        throw error;
      },
    });
  }

  @Post(routesV1.cart.fetch)
  @ApiOperation({ summary: 'Fetch cart from cookie or create a new one' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CartResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ApiResponse,
  })
  async fetchOrCreate(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<CartResponseDto> {
    const cartCookie = this.extractCartFromCookie(request);
    // or console.log(request.signedCookies);

    if (cartCookie) {
      const query = new FetchCartQuery({
        cart: cartCookie,
      });

      const result: FetchCartQueryResponse = await this.queryBus.execute(query);

      return match(result, {
        Ok: (cart) => {
          return {
            ...new ResponseBase({
              id: cart.id,
              createdAt: cart.createdAt,
              updatedAt: cart.updatedAt,
            }),
            lineItems: cart.lineItems,
            totalItems: cart.totalItems,
            subtotal: cart.subtotal,
          };
        },
        Err: (error: Error) => {
          if (error instanceof NotFoundException) {
            throw new HttpNotFoundException(error.message);
          }
          throw error;
        },
      });
    }

    // Create a new cart
    const command = new CreateCartCommand();
    const cart: CreateCartCommandResponse = await this.commandBus.execute(
      command,
    );
    console.log('Set-Cookie');
    this.setCartCookie(response, cart.unwrap());
    return {
      ...new ResponseBase({
        id: cart.unwrap().id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      lineItems: [],
      totalItems: 0,
      subtotal: 0,
    };
  }

  private extractCartFromCookie(request: Request): CartPrimitives | null {
    const cartCookie = request.cookies[COOKIE_KEY]
      ? JSON.parse(request.cookies[COOKIE_KEY])
      : null;
    return cartCookie;
  }

  private setCartCookie(response: Response, cart: CartPrimitives): void {
    const cookieValue = JSON.stringify(cart);
    response.cookie(COOKIE_KEY, cookieValue);
  }

  @ApiOperation({
    summary: 'Clear cart',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @Delete(routesV1.cart.empty)
  async clearCart(
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    response.clearCookie(COOKIE_KEY);
  }
}
