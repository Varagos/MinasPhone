import {
  ArgumentOutOfRangeException,
  InternalServerErrorException,
  NotFoundException,
} from '@libs/exceptions';
import { CommandHandler, QueryBus } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { UpdateCartLineItemCommand } from './update-cart-line-item.command';
import { CartEntity } from '@modules/orders/domain/cart.entity';
import { CartLineItemEntity } from '@modules/orders/domain/cart-line-item.entity';
import { CartPrimitives } from '../create-cart/create-cart.handler';
import { FindProductByIdQueryResponse } from '@modules/product-catalog/application/products/queries/find-product-by-id/find-product-by-id.handler';
import { FindProductByIdQuery } from '@modules/product-catalog/application/products/queries/find-product-by-id/find-product-by-id.query';
import { LineItemNotFoundError } from '@modules/orders/domain/cart.errors';

export type UpdateCartLineItemCommandResponse = Result<
  CartPrimitives,
  | NotFoundException
  | InternalServerErrorException
  | LineItemNotFoundError
  | ArgumentOutOfRangeException
>;

@CommandHandler(UpdateCartLineItemCommand)
export class UpdateCartLineItemCommandHandler {
  constructor(private queryBus: QueryBus) {}
  async execute(
    command: UpdateCartLineItemCommand,
  ): Promise<UpdateCartLineItemCommandResponse> {
    const cartFromCookie = command.cart;
    const lineItems = cartFromCookie.lineItems.map(
      (lineItem) =>
        new CartLineItemEntity({
          id: lineItem.id,
          props: {
            productId: lineItem.productId,
            quantity: lineItem.quantity,
          },
        }),
    );
    const cart = CartEntity.create({ lineItems }, cartFromCookie.id);

    const lineItem = cart.lineItems.find(
      (lineItem) => lineItem.id === command.id,
    );
    if (!lineItem) {
      return Err(new NotFoundException());
    }
    const findProductQuery = new FindProductByIdQuery({
      id: lineItem.productId,
    });
    const productFound: FindProductByIdQueryResponse =
      await this.queryBus.execute(findProductQuery);

    if (productFound.isErr()) {
      return Err(new NotFoundException());
    }

    const updateOrError = cart.updateLineItemQuantity(
      command.id,
      command.quantity,
      productFound.unwrap(),
    );

    if (updateOrError.isErr()) {
      return updateOrError;
    }
    const cartPrimitives = cart.toPrimitives();

    return Ok(cartPrimitives);
  }
}
