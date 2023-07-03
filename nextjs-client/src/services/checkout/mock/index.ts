import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response.js';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture.js';
import { Cart } from '../../../types/cart.js';
import { ICheckoutService } from '../index.js';
import { mockCart } from './mockData';
import { CheckoutToken } from '@/types/checkout-token.js';

class MockCheckoutService implements ICheckoutService {
  captureCheckout(
    checkoutTokenId: string,
    newOrder: CheckoutCapture
  ): Promise<CheckoutCaptureResponse> {
    throw new Error('Method not implemented.');
  }
  private cart: Cart = mockCart;

  async generateToken(
    cartId: string,
    options: Record<string, string>
  ): Promise<CheckoutToken> {
    return {
      id: 'checkout_1',
      created: 1624531200,
      expires: 1624531200,
      cart_id: cartId,
      line_items: this.cart.line_items.map(
        (item) =>
          ({
            ...item,
            description: item.product_meta.description,
            subtotal: item.price,
          } as any)
      ),
      live: {
        subtotal: this.cart.subtotal,
        total: this.cart.subtotal,
      },
    };
  }
}

export default MockCheckoutService;
