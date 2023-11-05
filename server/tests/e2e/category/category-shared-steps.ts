import { Mutable } from '@libs/types';
import { DefineStepFunction } from 'jest-cucumber';
import { TestContext } from 'tests/test-utils/TestContext';
import { ApiClient } from '@tests/test-utils/ApiClient';
import { CreateCategoryRequestDto } from '@modules/product-catalog/application/categories/commands/create-category/create-category.request.dto';
import { CategoryResponseDto } from '@modules/product-catalog/application/categories/dtos/category.response.dto';

/**
 * Test steps that are shared between multiple category tests
 */

export type CreateCategoryTestContext = {
  createCategoryDto: Mutable<CreateCategoryRequestDto>;
};

export const givenCategoryData = (
  given: DefineStepFunction,
  ctx: TestContext<CreateCategoryTestContext>,
): void => {
  given(/^category data$/, (table: CreateCategoryRequestDto[]) => {
    const data = table[0];
    if (data.parentId === 'null') data.parentId = null as any;
    ctx.context.createCategoryDto = table[0];
  });
};

export const iSendARequestToCreateACategory = (
  when: DefineStepFunction,
  ctx: TestContext<CreateCategoryTestContext>,
): void => {
  when('I send a request to create a category', async () => {
    const response = await new ApiClient().createCategory(
      ctx.context.createCategoryDto,
    );
    ctx.latestResponse = response;
  });
};
