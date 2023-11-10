import { Mutable } from '@libs/types';
import { DefineStepFunction } from 'jest-cucumber';
import { TestContext } from 'tests/test-utils/TestContext';
import { ApiClient } from '@tests/test-utils/ApiClient';
import { AddCartItemRequestDto } from '@modules/orders/application/carts/commands/add-line-item/add-cart-line-item.request.dto';
import { ProductResponseDto } from '@modules/product-catalog/application/categories/dtos/product.response.dto';
import { CartPrimitives } from '@modules/orders/application/carts/commands/create-cart/create-cart.handler';

/**
 * Test steps that are shared between multiple product tests
 */

export type CreateCartTestContext = {
  addCartItemDto: Mutable<AddCartItemRequestDto>;
  // productId: string;
  cart: CartPrimitives;
  setCookie: string;
};

export const givenCartData = (
  given: DefineStepFunction,
  ctx: TestContext<CreateCartTestContext>,
): void => {
  given(/^Cart item data$/, async (table: GherkinFeatureCartItem[]) => {
    const data = table[0];
    const products = await new ApiClient().findAllProducts();
    console.log('find all products', products.data);
    ctx.context.addCartItemDto =
      mapGherkinFeatureProductToCreateProductRequestDto(data, products.data);
  });
};

export const iFetchTheCart = (
  when: DefineStepFunction,
  ctx: TestContext<CreateCartTestContext>,
): void => {
  when('I fetch the cart', async () => {
    const response = await new ApiClient().fetchCart();
    ctx.latestResponse = response;
    ctx.context.cart = response.value;
    ctx.context.setCookie = response.setCookies;
  });
};

export const iSendARequestToAddACartItem = (
  when: DefineStepFunction,
  ctx: TestContext<CreateCartTestContext>,
): void => {
  when('I send a request to add the product to the cart', async () => {
    console.log('set cookie', ctx.context.setCookie);
    const response = await new ApiClient().addItemToCart(
      ctx.context.addCartItemDto.productId,
      ctx.context.addCartItemDto.quantity,
      ctx.context.setCookie,
    );
    // console.log('response', response);
    ctx.latestResponse = response;
    ctx.context.cart = response.value;
    ctx.context.setCookie = response.setCookies;
  });
};

type GherkinFeatureCartItem = {
  name: string;
  quantity: string;
};

const mapGherkinFeatureProductToCreateProductRequestDto = (
  cartItem: GherkinFeatureCartItem,
  products: readonly ProductResponseDto[],
): AddCartItemRequestDto => {
  const product = products.find((item) => item.name === cartItem.name);

  if (!product) {
    console.log('cartItem', cartItem);
    console.log('products', products);
    throw new Error('Product not found');
  }

  return {
    productId: product.id,
    quantity: Number(cartItem.quantity),
  };
};
