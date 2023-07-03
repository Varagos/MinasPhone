import { commerce } from '../../lib/commerce';
import { CheckoutCapture } from '../../types/checkout-capture';
import { CheckoutCaptureResponse } from '../../types/checkout-capture-response';
import { CheckoutToken } from '../../types/checkout-token';
import { cartService } from '../cart';
import CommerceJSCheckoutService from './commercejs';
import MockCheckoutService from './mock';
import OrdersService from './server';

export interface ICheckoutService {
  generateToken(cartId: string, options: Record<string, string>): Promise<CheckoutToken>;
  captureCheckout(checkoutTokenId: string, newOrder: CheckoutCapture): Promise<CheckoutCaptureResponse>;
}

const services: { [env: string]: () => any } = {
  mock: () => new MockCheckoutService(),
  commercejs: () => new CommerceJSCheckoutService(commerce),
  server: () => new OrdersService(cartService),
};

const checkoutService: ICheckoutService = process.env.NEXT_PUBLIC_ENVIRONMENT
  ? services[process.env.NEXT_PUBLIC_ENVIRONMENT]()
  : new MockCheckoutService();

export { checkoutService };
