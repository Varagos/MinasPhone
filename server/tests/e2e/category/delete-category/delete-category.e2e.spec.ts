import { defineFeature, loadFeature } from 'jest-cucumber';
import { DatabasePool, sql } from 'slonik';
import { TestContext } from '@tests/test-utils/TestContext';
import { ApiClient } from '@tests/test-utils/ApiClient';
import { CategoryResponseDto } from '@modules/product-catalog/application/categories/dtos/category.response.dto';
import {
  CreateCategoryTestContext,
  givenCategoryData,
  iSendARequestToCreateACategory,
} from '../category-shared-steps';
import { IdResponse } from '@libs/api/id.response.dto';
import { getConnectionPool } from '@tests/setup/jestSetupAfterEnv';

const feature = loadFeature(
  'tests/e2e/category/delete-category/delete-category.feature',
);

defineFeature(feature, (test) => {
  let pool: DatabasePool;
  const apiClient = new ApiClient();

  beforeAll(() => {
    pool = getConnectionPool();
  });

  afterEach(async () => {
    await pool.query(sql`TRUNCATE "categories" CASCADE`);
  });

  test('I can delete a category', ({ given, when, then, and }) => {
    const ctx = new TestContext<CreateCategoryTestContext>();
    let categoryId = '';

    givenCategoryData(given, ctx);

    iSendARequestToCreateACategory(when, ctx);

    given('I have a category ID', () => {
      const response = ctx.latestResponse as IdResponse;
      categoryId = response.id;
    });

    when('I send a request to delete the category with that ID', async () => {
      await apiClient.deleteCategory(categoryId);
    });

    then('I cannot see my category in a list of all categories', async () => {
      const res = await apiClient.findAllCategories();
      const response = ctx.latestResponse as IdResponse;
      expect(
        res.data.some((item: CategoryResponseDto) => item.id === response.id),
      ).toBe(false);
    });
  });
});
