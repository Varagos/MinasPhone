import { Mutable } from '@libs/types';
import { DefineStepFunction } from 'jest-cucumber';
import { TestContext } from 'tests/test-utils/TestContext';
import { ApiClient } from '@tests/test-utils/ApiClient';
import { CreateProductRequestDto } from '@modules/product-catalog/application/products/commands/create-product/create-product.request.dto';
import { CategoryResponseDto } from '@modules/product-catalog/application/categories/dtos/category.response.dto';

/**
 * Test steps that are shared between multiple product tests
 */

export type CreateProductTestContext = {
  createProductDto: Mutable<CreateProductRequestDto>;
  productId: string;
};

export const givenProductData = (
  given: DefineStepFunction,
  ctx: TestContext<CreateProductTestContext>,
): void => {
  given(/^product data$/, async (table: GherkinFeatureProduct[]) => {
    const data = table[0];
    const categories = await new ApiClient().findAllCategories();
    ctx.context.createProductDto =
      mapGherkinFeatureProductToCreateProductRequestDto(data, categories.data);
  });
};

export const iSendARequestToCreateAProduct = (
  when: DefineStepFunction,
  ctx: TestContext<CreateProductTestContext>,
): void => {
  when('I send a request to create a product', async () => {
    const response = await new ApiClient().createProduct(
      ctx.context.createProductDto,
    );
    ctx.context.productId = response.id;
    // console.log('response', response);
    ctx.latestResponse = response;
  });
};

type GherkinFeatureProduct = {
  name: string;
  description: string;
  price: string;
  quantity: string;
  active: string;
  image: string;
  sku: string;
  category_slug: string;
};

const mapGherkinFeatureProductToCreateProductRequestDto = (
  product: GherkinFeatureProduct,
  categories: readonly CategoryResponseDto[],
): CreateProductRequestDto => {
  const category = categories.find(
    (item) => item.slug === product.category_slug,
  );
  if (!category) throw new Error('Category not found');

  return {
    name: product.name,
    description: product.description,
    price: Number(product.price),
    quantity: Number(product.quantity),
    active: product.active === 'true',
    image: product.image,
    sku: product.sku,
    categoryId: category?.id,
  };
};
