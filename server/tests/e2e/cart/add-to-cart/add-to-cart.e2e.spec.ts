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
} from '../cart-shared-steps';
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
import exp from 'constants';
import { iReceiveAnErrorWithStatusCode } from '@tests/shared/shared-steps';

const feature = loadFeature('tests/e2e/cart/add-to-cart/add-to-cart.feature');

defineFeature(feature, (test) => {
  let pool: DatabasePool;
  const apiClient = new ApiClient();

  beforeAll(() => {
    pool = getConnectionPool();
  });

  afterEach(async () => {
    await pool.query(sql`TRUNCATE "categories" CASCADE`);
    await pool.query(sql`TRUNCATE "products" CASCADE`);
  });

  const categoryAndProductBackground = ({
    given,
    and,
  }: {
    given: DefineStepFunction;
    and: DefineStepFunction;
  }): {
    categoryCtx: TestContext<CreateCategoryTestContext>;
    productCtx: TestContext<CreateProductTestContext>;
  } => {
    const ctx = new TestContext<CreateProductTestContext>();

    const categoryCtx = new TestContext<CreateCategoryTestContext>();

    givenCategoryData(given, categoryCtx);
    iSendARequestToCreateACategory(and, categoryCtx);
    givenProductData(and, ctx);
    iSendARequestToCreateAProduct(and, ctx);
    return { categoryCtx, productCtx: ctx };
  };

  test('Fetching the cart creates a new cart if none exists', ({
    given,
    when,
    and,
    then,
  }) => {
    const { categoryCtx, productCtx } = categoryAndProductBackground({
      given,
      and,
    });

    const cartContext = new TestContext<CreateCartTestContext>();

    iFetchTheCart(when, cartContext);

    then('I receive a cart cookie', () => {
      const cart = cartContext.context.cart;
      console.log('cart', cart);
      expect(cart).toBeDefined();
      expect(cart.id).toBeDefined();
      expect(cart.lineItems).toEqual([]);
    });
  });

  test('Adding a product to the cart', ({ given, when, then, and }) => {
    const { categoryCtx, productCtx } = categoryAndProductBackground({
      given,
      and,
    });

    const cartContext = new TestContext<CreateCartTestContext>();

    iFetchTheCart(given, cartContext);

    givenCartData(and, cartContext);

    iSendARequestToAddACartItem(when, cartContext);

    then('the product should be added to the cart', async () => {
      // const cart = await apiClient.fetchCart(cartContext.context.setCookie);
      const cart = cartContext.context.cart;
      expect(cart.lineItems).toContainEqual(
        expect.objectContaining({ productId: productCtx.context.productId }),
      );
    });

    and(
      'the cart should contain the product with the specified quantity',
      () => {
        const cart = cartContext.context.cart;
        const cartItem = cart.lineItems.find(
          (item) => item.productId === productCtx.context.productId,
        );
        expect(cartItem?.quantity).toBe(5);
      },
    );
  });

  test('Adding a product with invalid data to the cart', ({
    given,
    when,
    then,
    and,
  }) => {
    const { categoryCtx, productCtx } = categoryAndProductBackground({
      given,
      and,
    });

    const cartContext = new TestContext<CreateCartTestContext>();

    iFetchTheCart(given, cartContext);

    givenCartData(and, cartContext);

    iSendARequestToAddACartItem(when, cartContext);

    iReceiveAnErrorWithStatusCode(then, cartContext);
  });
});
