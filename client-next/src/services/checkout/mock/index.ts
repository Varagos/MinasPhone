import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response.js';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture.js';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token.js';
import { Cart } from '../../../types/cart.js';
import { ICheckoutService } from '../index.js';
import { mockCart } from './mockData';

class MockCheckoutService implements ICheckoutService {
  captureCheckout(checkoutTokenId: string, newOrder: CheckoutCapture): Promise<CheckoutCaptureResponse> {
    throw new Error('Method not implemented.');
  }
  private cart: Cart = mockCart;

  generateToken(cartId: string, options: Record<string, string>): Promise<CheckoutToken> {
    throw new Error('Method not implemented.');
  }
}

export default MockCheckoutService;
