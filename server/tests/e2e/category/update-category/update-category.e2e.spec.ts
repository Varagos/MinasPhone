import { IdResponse } from '@libs/api/id.response.dto';
import { CategoryResponseDto } from '@modules/product-catalog/application/categories/dtos/category.response.dto';
import { getConnectionPool } from '@tests/setup/jestSetupAfterEnv';
import { ApiClient } from '@tests/test-utils/ApiClient';
import { TestContext } from '@tests/test-utils/TestContext';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { DatabasePool, sql } from 'slonik';
import {
  CreateCategoryTestContext,
  givenCategoryData,
  iSendARequestToCreateACategory,
} from '../category-shared-steps';

const feature = loadFeature(
  'tests/e2e/category/update-category/update-category.feature',
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

  test('I can update a category', ({ given, when, then, and }) => {
    const ctx = new TestContext<CreateCategoryTestContext>();
    let categoryId = '';

    givenCategoryData(given, ctx);

    iSendARequestToCreateACategory(when, ctx);

    given('I have a category ID', () => {
      const response = ctx.latestResponse as IdResponse;
      categoryId = response.id;
    });

    when(
      'I send a request to update the category with ID and new data',
      async (table) => {
        const data = table[0];
        await apiClient.updateCategory(categoryId, {
          slug: data['slug'],
          name: data['name'],
        });
      },
    );

    then(
      'I should see the category with ID updated in the list of all categories',
      async (table) => {
        const data = table[0];
        const categories = await apiClient.findAllCategories();
        //   const response = ctx.latestResponse as IdResponse;
        const category = categories.data.find(
          (item: CategoryResponseDto) => item.id === categoryId,
        );
        expect(category).toBeDefined();
        if (!category) throw new Error('Category not found');
        expect(category.slug).toBe(data['slug']);
        expect(category.name).toBe(data['name']);
      },
    );
  });
});
