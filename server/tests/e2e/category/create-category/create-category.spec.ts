import { defineFeature, loadFeature } from 'jest-cucumber';
import { DatabasePool, sql } from 'slonik';
import {
  CreateCategoryTestContext,
  givenUserProfileData,
  iSendARequestToCreateAUser,
} from '../category-shared-steps';
import { ApiClient } from '@tests/test-utils/ApiClient';
import { iReceiveAnErrorWithStatusCode } from '@tests/shared/shared-steps';
import { TestContext } from '@tests/test-utils/TestContext';
import { getConnectionPool } from '@tests/setup/jestSetupAfterEnv';
import { IdResponse } from '@libs/api/id.response.dto';
import { CategoryResponseDto } from '@modules/product-catalog/application/categories/dtos/category.response.dto';

const feature = loadFeature(
  'tests/e2e/category/create-category/create-category.feature',
);

/**
 * e2e test implementing a Gherkin feature file
 * https://github.com/Sairyss/backend-best-practices#testing
 */

defineFeature(feature, (test) => {
  let pool: DatabasePool;
  const apiClient = new ApiClient();

  beforeAll(() => {
    pool = getConnectionPool();
  });

  afterEach(async () => {
    await pool.query(sql`TRUNCATE "categories"`);
    // await pool.query(sql`TRUNCATE "wallets"`);
  });

  test('I can create a category', ({ given, when, then, and }) => {
    const ctx = new TestContext<CreateCategoryTestContext>();

    givenUserProfileData(given, ctx);

    iSendARequestToCreateAUser(when, ctx);

    then('I receive the category ID', () => {
      const response = ctx.latestResponse as IdResponse;
      expect(typeof response.id).toBe('string');
    });

    and('I can see my category in a list of all categories', async () => {
      const res = await apiClient.findAllCategories();
      const response = ctx.latestResponse as IdResponse;

      expect(
        res.data.some((item: CategoryResponseDto) => item.id === response.id),
      ).toBe(true);
    });
  });

  test('I try to create a category with invalid data', ({
    given,
    when,
    then,
  }) => {
    const ctx = new TestContext<CreateCategoryTestContext>();

    givenUserProfileData(given, ctx);

    iSendARequestToCreateAUser(when, ctx);

    iReceiveAnErrorWithStatusCode(then, ctx);
  });
});
