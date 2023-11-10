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
import { ProductResponseDto } from '@modules/product-catalog/application/categories/dtos/product.response.dto';

const feature = loadFeature(
  'tests/e2e/product/delete-product/delete-product.feature',
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

  test('I can delete a product', ({ given, when, then, and }) => {
    // Use TestContext to share state between steps
    const ctx = new TestContext<CreateProductTestContext>();

    const categoryCtx = new TestContext<CreateCategoryTestContext>();

    givenCategoryData(given, categoryCtx);
    iSendARequestToCreateACategory(and, categoryCtx);
    givenProductData(and, ctx);

    iSendARequestToCreateAProduct(and, ctx);

    let productId = '';
    given('I have a product ID', () => {
      const response = ctx.latestResponse as IdResponse;
      productId = response.id;
    });

    when('I send a request to delete the product with that ID', async () => {
      await apiClient.deleteProduct(productId);
    });

    then('I cannot see my product in a list of all products', async () => {
      const res = await apiClient.findAllProducts();
      expect(
        res.data.some((item: ProductResponseDto) => item.id === productId),
      ).toBe(false);
    });
  });
});
