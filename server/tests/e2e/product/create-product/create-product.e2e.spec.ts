import { getConnectionPool } from '@tests/setup/jestSetupAfterEnv';
import { ApiClient } from '@tests/test-utils/ApiClient';
import { TestContext } from '@tests/test-utils/TestContext';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { DatabasePool, sql } from 'slonik';
import {
  CreateProductTestContext,
  givenProductData,
  iSendARequestToCreateAProduct,
} from '../product-shared-steps';
import {
  CreateCategoryTestContext,
  givenCategoryData,
  iSendARequestToCreateACategory,
} from '@tests/e2e/category/category-shared-steps';
import { IdResponse } from '@libs/api/id.response.dto';
import { iReceiveAnErrorWithStatusCode } from '@tests/shared/shared-steps';

const feature = loadFeature(
  'tests/e2e/product/create-product/create-product.feature',
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
  });

  test('I can create a product with an existing category', ({
    given,
    when,
    then,
    and,
  }) => {
    // Use TestContext to share state between steps
    const ctx = new TestContext<CreateProductTestContext>();

    const categoryCtx = new TestContext<CreateCategoryTestContext>();

    givenCategoryData(given, categoryCtx);
    iSendARequestToCreateACategory(when, categoryCtx);

    givenProductData(given, ctx);
    iSendARequestToCreateAProduct(when, ctx);

    then('I receive the product ID', () => {
      const response = ctx.latestResponse as IdResponse;
      expect(response).toBeDefined();
      expect(typeof response.id).toBe('string');
      ctx.context.productId = response.id; // Save product ID for further steps
    });

    and('I can see my product in a list of all products', async () => {
      const res = await apiClient.findAllProducts();
      expect(
        res.data.some((product) => product.id === ctx.context.productId),
      ).toBe(true);
    });
  });

  test('I try to create a product with invalid data', ({
    given,
    when,
    then,
  }) => {
    // Use TestContext to share state between steps
    const ctx = new TestContext<CreateProductTestContext>();

    const categoryCtx = new TestContext<CreateCategoryTestContext>();

    givenCategoryData(given, categoryCtx);
    iSendARequestToCreateACategory(when, categoryCtx);

    givenProductData(given, ctx);
    iSendARequestToCreateAProduct(when, ctx);

    iReceiveAnErrorWithStatusCode(then, ctx);
  });
});
