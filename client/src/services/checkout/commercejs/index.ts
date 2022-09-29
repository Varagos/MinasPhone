import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { ICheckoutService } from '..';
import Commerce from '@chec/commerce.js';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';

class CommerceJSCheckoutService implements ICheckoutService {
  constructor(private client: Commerce) {}
  async generateToken(cartId: string, options: Record<string, string>): Promise<CheckoutToken> {
    const token = await this.client.checkout.generateToken(cartId, { type: 'cart' });
    return token;
  }

  async captureCheckout(checkoutTokenId: string, newOrder: CheckoutCapture): Promise<CheckoutCaptureResponse> {
    const incomingOrder = await this.client.checkout.capture(checkoutTokenId, newOrder);
    return incomingOrder;
  }
}

export default CommerceJSCheckoutService;
