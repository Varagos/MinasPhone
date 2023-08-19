import {
  ArgumentOutOfRangeException,
  InternalServerErrorException,
  NotFoundException,
} from '@libs/exceptions';
import { CommandHandler, QueryBus } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { AddCartLineItemCommand } from './add-cart-line-item.command';
import { CartEntity } from '@modules/orders/domain/cart.entity';
import { CartLineItemEntity } from '@modules/orders/domain/cart-line-item.entity';
import { CartPrimitives } from '../create-cart/create-cart.handler';
import { FindProductByIdQuery } from '@modules/product-catalog/application/products/queries/find-product-by-id/find-product-by-id.query';
import { FindProductByIdQueryResponse } from '@modules/product-catalog/application/products/queries/find-product-by-id/find-product-by-id.handler';

export type AddCartLineItemCommandResponse = Result<
  CartPrimitives,
  NotFoundException | InternalServerErrorException | ArgumentOutOfRangeException
>;

@CommandHandler(AddCartLineItemCommand)
export class AddCartLineItemCommandHandler {
  constructor(private queryBus: QueryBus) {}
  async execute(
    command: AddCartLineItemCommand,
  ): Promise<AddCartLineItemCommandResponse> {
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

    const findProductQuery = new FindProductByIdQuery({
      id: command.productId,
    });
    const productFound: FindProductByIdQueryResponse =
      await this.queryBus.execute(findProductQuery);

    if (productFound.isErr()) {
      return Err(
        new NotFoundException(`Product with id ${command.productId} not found`),
      );
    }

    const newLineItem = CartLineItemEntity.create({
      productId: command.productId,
      quantity: command.quantity,
    });

    const addedOrError = cart.addLineItem(newLineItem, productFound.unwrap());
    if (addedOrError.isErr()) {
      return Err(addedOrError.unwrapErr());
    }

    const cartPrimitives = cart.toPrimitives();

    return Ok(cartPrimitives);
  }
}
