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
import {
  CreateOrderTestContext,
  givenCartDataAndOrderInformation,
  iSendARequestToCheckoutTheOrder,
} from '../order-shared-steps';

jest.setTimeout(5 * 60 * 1000);

const feature = loadFeature(
  'tests/e2e/order/update-order-status/update-order-status.feature',
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

  test('Update order status', ({ given, when, and, then }) => {
    const { cartContext } = categoryProductAndCartBackground({
      given,
      and,
    });

    const ctx = new TestContext<CreateOrderTestContext>();

    givenCartDataAndOrderInformation(given, ctx, cartContext);

    iSendARequestToCheckoutTheOrder(and, ctx);

    when(
      /^I send a request to update the order status$/,
      async (table: { status: string }[]) => {
        const data = table[0];
        const { status } = data;
        console.log('status', status);
        const order = await apiClient.getOrderInfoBySlug(ctx.context.orderSlug);

        const response = await apiClient.updateOrderStatus(order.id, {
          status: status,
        });
        console.log('response', response.status);
      },
    );

    then(
      /^the order status should be updated$/,
      async (table: { status: string }[]) => {
        const data = table[0];
        const { status } = data;

        const order = await apiClient.getOrderInfoBySlug(ctx.context.orderSlug);
        expect(order.status).toBe(status);
      },
    );
  });
});
