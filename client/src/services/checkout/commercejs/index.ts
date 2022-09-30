import Commerce from '@chec/commerce.js';
import { ICheckoutService } from '..';
import { CheckoutCapture } from '../../../types/checkout-capture';
import { CheckoutCaptureResponse } from '../../../types/checkout-capture-response';
import { CheckoutToken } from '../../../types/checkout-token';

class CommerceJSCheckoutService implements ICheckoutService {
  constructor(private client: Commerce) {}
  async generateToken(cartId: string, options: Record<string, string>): Promise<CheckoutToken> {
    const token = await this.client.checkout.generateToken(cartId, { type: 'cart' });
    return structuredClone(token);
  }

  async captureCheckout(checkoutTokenId: string, newOrder: CheckoutCapture): Promise<CheckoutCaptureResponse> {
    const incomingOrder = await this.client.checkout.capture(checkoutTokenId, newOrder);
    return structuredClone(incomingOrder);
  }
}

export default CommerceJSCheckoutService;
