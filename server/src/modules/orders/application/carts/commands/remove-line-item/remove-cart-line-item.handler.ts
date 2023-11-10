import {
  InternalServerErrorException,
  NotFoundException,
} from '@libs/exceptions';
import { CommandHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { RemoveCartLineItemCommand } from './remove-cart-line-item.command';
import { CartEntity } from '@modules/orders/domain/cart.entity';
import { CartLineItemEntity } from '@modules/orders/domain/cart-line-item.entity';
import { CartPrimitives } from '../create-cart/create-cart.handler';

export type RemoveCartLineItemCommandResponse = Result<
  CartPrimitives,
  NotFoundException | InternalServerErrorException
>;

@CommandHandler(RemoveCartLineItemCommand)
export class RemoveCartLineItemCommandHandler {
  async execute(
    command: RemoveCartLineItemCommand,
  ): Promise<RemoveCartLineItemCommandResponse> {
    const cartLineItemId = command.id;
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

    cart.removeLineItem(cartLineItemId);

    const cartPrimitives = cart.toPrimitives();

    return Ok(cartPrimitives);
  }
}
