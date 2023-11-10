import { Mutable } from '@libs/types';
import { DefineStepFunction } from 'jest-cucumber';
import { TestContext } from 'tests/test-utils/TestContext';
import { ApiClient } from '@tests/test-utils/ApiClient';
import { AddCartItemRequestDto } from '@modules/orders/application/carts/commands/add-line-item/add-cart-line-item.request.dto';
import { ProductResponseDto } from '@modules/product-catalog/application/categories/dtos/product.response.dto';
import { CartPrimitives } from '@modules/orders/application/carts/commands/create-cart/create-cart.handler';
import { CreateCartTestContext } from '../cart/cart-shared-steps';
import { CheckoutOrderRequestDto } from '@modules/orders/application/orders/commands/checkout-order/checkout-order.request.dto';

/**
 * Test steps that are shared between multiple product tests
 */

export type CreateOrderTestContext = {
  checkoutOrderRequestDto: Mutable<CheckoutOrderRequestDto>;
  // This cookie represents the cart
  setCookie: string;
  orderSlug: string;
};

export const givenCartDataAndOrderInformation = (
  given: DefineStepFunction,
  ctx: TestContext<CreateOrderTestContext>,
  cartContext: TestContext<CreateCartTestContext>,
): void => {
  given(
    /^I have items in the cart and order information$/,
    async (table: GherkinFeatureOrderInformation[]) => {
      ctx.context.setCookie = cartContext.context.setCookie;

      const data = table[0];
      ctx.context.checkoutOrderRequestDto =
        mapGherkinFeatureProductToCreateProductRequestDto(data);
    },
  );
};

export const iSendARequestToCheckoutTheOrder = (
  when: DefineStepFunction,
  ctx: TestContext<CreateOrderTestContext>,
): void => {
  when('I send a request to checkout the cart', async () => {
    console.log('set cookie', ctx.context.setCookie);
    const response = await new ApiClient().checkoutOrder(
      ctx.context.checkoutOrderRequestDto,
      ctx.context.setCookie,
    );
    ctx.context.orderSlug = response.id;
    ctx.latestResponse = response;
  });
};

type GherkinFeatureOrderInformation = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

const mapGherkinFeatureProductToCreateProductRequestDto = (
  orderInfo: GherkinFeatureOrderInformation,
): CheckoutOrderRequestDto => {
  return {
    firstName: orderInfo.firstName,
    lastName: orderInfo.lastName,
    email: orderInfo.email,
    phone: orderInfo.phoneNumber,
  };
};
