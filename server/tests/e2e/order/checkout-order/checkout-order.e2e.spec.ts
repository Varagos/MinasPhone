// ... other imports and setup ...

import { getConnectionPool } from '@tests/setup/jestSetupAfterEnv';
import { ApiClient } from '@tests/test-utils/ApiClient';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { DefineStepFunction } from 'jest-cucumber/dist/src/feature-definition-creation';
import { DatabasePool, sql } from 'slonik';
import {
  CreateCartTestContext,
  givenCartData,
  iFetchTheCart,
  iSendARequestToAddACartItem,
} from '@tests/e2e/cart/cart-shared-steps';
import {
  CreateCategoryTestContext,
  givenCategoryData,
  iSendARequestToCreateACategory,
} from '@tests/e2e/category/category-shared-steps';
import { TestContext } from '@tests/test-utils/TestContext';
import {
  CreateProductTestContext,
  givenProductData,
  iSendARequestToCreateAProduct,
} from '@tests/e2e/product/product-shared-steps';
import { CartPrimitives } from '@modules/orders/application/carts/commands/create-cart/create-cart.handler';
import { iReceiveAnErrorWithStatusCode } from '@tests/shared/shared-steps';
import {
  CreateOrderTestContext,
  givenCartDataAndOrderInformation,
  iSendARequestToCheckoutTheOrder,
} from '../order-shared-steps';

jest.setTimeout(5 * 60 * 1000);

const feature = loadFeature(
  'tests/e2e/order/checkout-order/checkout-order.feature',
);

defineFeature(feature, (test) => {
  let pool: DatabasePool;
  const apiClient = new ApiClient();

  beforeAll(() => {
    pool = getConnectionPool();
  });

  afterEach(async () => {
    await pool.query(sql`TRUNCATE "categories" CASCADE`);
    await pool.query(sql`TRUNCATE "products" CASCADE`);
    await pool.query(sql`TRUNCATE "order_items" CASCADE`);
    await pool.query(sql`TRUNCATE "orders" CASCADE`);
  });

  const categoryProductAndCartBackground = ({
    given,
    and,
  }: {
    given: DefineStepFunction;
    and: DefineStepFunction;
  }): {
    categoryCtx: TestContext<CreateCategoryTestContext>;
    productCtx: TestContext<CreateProductTestContext>;
    cartContext: TestContext<CreateCartTestContext>;
  } => {
    const productCtx = new TestContext<CreateProductTestContext>();

    const categoryCtx = new TestContext<CreateCategoryTestContext>();

    const cartContext = new TestContext<CreateCartTestContext>();

    givenCategoryData(given, categoryCtx);
    iSendARequestToCreateACategory(and, categoryCtx);
    givenProductData(and, productCtx);
    iSendARequestToCreateAProduct(and, productCtx);

    iFetchTheCart(and, cartContext);

    givenCartData(and, cartContext);

    iSendARequestToAddACartItem(and, cartContext);

    return { categoryCtx, productCtx, cartContext };
  };

  test('Successfully creating an order', ({ given, when, and, then }) => {
    const { cartContext } = categoryProductAndCartBackground({
      given,
      and,
    });

    const ctx = new TestContext<CreateOrderTestContext>();

    givenCartDataAndOrderInformation(given, ctx, cartContext);

    iSendARequestToCheckoutTheOrder(when, ctx);

    then('an order should be created', () => {
      expect(ctx.context.orderSlug).toBeDefined();
      expect(ctx.context.orderSlug).not.toBe('');
    });

    and(
      'the order should contain the correct items and quantities',
      async () => {
        const order = await apiClient.getOrderInfoBySlug(ctx.context.orderSlug);
        const cart = cartContext.context.cart;

        const cartLineItems = cart.lineItems.map((item) => {
          return {
            productId: item.productId,
            quantity: item.quantity,
          };
        });

        const orderLineItems = order.lineItems.map((item) => {
          return {
            productId: item.productId,
            quantity: item.quantity,
          };
        });

        expect(orderLineItems).toEqual(cartLineItems);
      },
    );

    and(
      /^the stock quantity of the product should become "([^"]*)"$/,
      async (expectedQuantity) => {
        const sleep = (ms: number) =>
          new Promise((resolve) => setTimeout(resolve, ms));
        // TODO: find a better way to wait for the event handler to finish(Choreography)
        await sleep(3000);
        const products = await apiClient.findAllProducts();
        const product = products.data.find(
          (item) => item.id === cartContext.context.addCartItemDto.productId,
        );

        expect(product).toBeDefined();
        expect(product?.quantity).toBe(+expectedQuantity);
      },
    );
  });
});
