import { ICheckoutService } from '../index';
import { getApiUrl, postData } from '../../httpClient';
import { CheckoutCapture } from '../../../types/checkout-capture';
import { CheckoutCaptureResponse } from '../../../types/checkout-capture-response';
import { CheckoutToken } from '../../../types/checkout-token';
import { rawPriceToFormatted } from '../../products/server';

type GetOrderDTO = {
  id: string;
  items: Array<{
    productId: string;
    unitPrice: number;
    quantity: number;
    productName: string;
  }>;
  status: string;
  total: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
};

class OrdersService implements ICheckoutService {
  private apiBaseUrl = getApiUrl() + '/orders';
  static tokenMapper: { [tokenId: string]: string } = {};
  static lastId = 0;

  async generateToken(cartId: string, options: Record<string, string>): Promise<CheckoutToken> {
    OrdersService.tokenMapper[OrdersService.lastId] = cartId;

    return {
      id: OrdersService.lastId++,
      cart_id: cartId,
      created: 1,
      expires: 1,
      analytics: {},
    } as any;
  }
  async captureCheckout(checkoutTokenId: string, newOrder: CheckoutCapture): Promise<CheckoutCaptureResponse> {
    const cartId = OrdersService.tokenMapper[checkoutTokenId];
    const { firstname, lastname, email, phone } = newOrder.customer;
    const data = await postData(`${this.apiBaseUrl}/checkout/${cartId}`, {
      firstName: firstname,
      lastName: lastname,
      email,
      phone,
    });
    const { id: orderId } = data;
    const orderInfoResponse = await fetch(`${this.apiBaseUrl}/orders/${orderId}`);
    const orderInfo: GetOrderDTO = await orderInfoResponse.json();

    return {
      id: orderInfo.id,
      cart_id: cartId,
      created: orderInfo.date,
      // currency: Currency;
      order_value: rawPriceToFormatted(orderInfo.total),
      customer: {
        email,
        firstname: orderInfo.firstName,
        lastname: orderInfo.lastName,
      },
    } as any;
  }
}

export default OrdersService;
