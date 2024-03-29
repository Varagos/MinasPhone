import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { FetchCartQuery } from './fetch-cart.query';
import { FindProductsByIdsQuery } from '@modules/product-catalog/application/products/queries/find-products-by-ids/find-products-by-ids.query';
import { FindProductsByIdsQueryResponse } from '@modules/product-catalog/application/products/queries/find-products-by-ids/find-products-by-ids.handler';
import { NotFoundException } from '@libs/exceptions';
import Decimal from 'decimal.js';

export type FetchCartQueryResponse = Result<CartReadModel, Error>;

type CartLineItemReadModel = {
  id: string;
  productId: string;
  quantity: number;
  productName: string;
  productSlug: string;
  productPrice: number;
  productImage: string;
};

export type CartReadModel = {
  id: string;
  lineItems: CartLineItemReadModel[];
  totalItems: number;
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;
};

@QueryHandler(FetchCartQuery)
export class FetchCartQueryHandler implements IQueryHandler {
  constructor(private readonly queryBus: QueryBus) {}

  async execute(query: FetchCartQuery): Promise<FetchCartQueryResponse> {
    const cartFromCookie = query.cart;
    const productIds = cartFromCookie.lineItems.map(
      (lineItem) => lineItem.productId,
    );
    if (productIds.length === 0) {
      return Ok({
        id: cartFromCookie.id,
        lineItems: [],
        totalItems: 0,
        subtotal: 0,
        createdAt: cartFromCookie.createdAt,
        updatedAt: cartFromCookie.updatedAt,
      });
    }
    const findProductsQuery = new FindProductsByIdsQuery({
      ids: productIds,
    });
    const productsOrError = await this.queryBus.execute<
      FindProductsByIdsQuery,
      FindProductsByIdsQueryResponse
    >(findProductsQuery);

    const products = productsOrError.unwrap();

    const lineItemsOrError = Result.all(
      ...cartFromCookie.lineItems.map(
        (lineItem): Result<CartLineItemReadModel, string> => {
          const product = products.find(
            (product) => product.id === lineItem.productId,
          );

          if (!product) {
            return Err(
              `Product with id "${lineItem.productId}" for cart line item with id "${lineItem.id}" not found`,
            );
          }
          return Ok({
            id: lineItem.id,
            productId: lineItem.productId,
            quantity: lineItem.quantity,
            productName: product.name,
            productSlug: product.slug,
            productPrice: product.price,
            productImage: product.image_uri,
          });
        },
      ),
    );
    if (lineItemsOrError.isErr()) {
      const errorMessage = lineItemsOrError.unwrapErr();
      return Err(new NotFoundException(errorMessage));
    }

    const lineItems = lineItemsOrError.unwrap();

    const totalItems = lineItems.reduce(
      (acc, lineItem) => acc + lineItem.quantity,
      0,
    );

    const subtotal = lineItems
      .reduce(
        (acc, lineItem) =>
          acc.plus(
            new Decimal(lineItem.quantity).times(
              new Decimal(lineItem.productPrice),
            ),
          ),
        new Decimal(0),
      )
      .toNumber();

    return Ok({
      id: cartFromCookie.id,
      lineItems: lineItemsOrError.unwrap(),
      totalItems,
      subtotal,
      createdAt: cartFromCookie.createdAt,
      updatedAt: cartFromCookie.updatedAt,
    });
  }
}
