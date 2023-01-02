import { ICheckoutService } from '../index';
import { getApiUrl, postData } from '../../httpClient';
import { CheckoutCapture } from '../../../types/checkout-capture';
import { CheckoutCaptureResponse } from '../../../types/checkout-capture-response';
import { CheckoutToken } from '../../../types/checkout-token';
import { rawPriceToFormatted } from '../../products/server';
import { makeHttpRequest } from '../../httpClient/fetch';
import { ICartService } from '../../cart';

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
  constructor(private cartService: ICartService) {}
  private apiBaseUrl = getApiUrl() + '/orders';
  static tokenMapper: { [tokenId: string]: string } = {};
  static lastId = 0;
  static cartId: string;

  // Confirm product quantities(?& prices) in shopping cart
  async generateToken(cartId: string, options: Record<string, string>): Promise<CheckoutToken> {
    OrdersService.tokenMapper[OrdersService.lastId] = cartId;
    OrdersService.cartId = cartId;
    // For now we fetch the cart, which acts as draft order
    const cart = await this.cartService.fetch();

    return {
      id: cart.id,
      cart_id: cart.id,
      created: 1,
      expires: 1,
      line_items: cart.line_items.map((item) => ({
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        name: item.name,
        product_name: item.product_name,
        price: item.price,
        media: item.media,
        sku: item.sku,
        line_total: item.line_total,
        selected_options: item.selected_options,
        permalink: item.permalink,
        product_meta: item.product_meta,
        image: 'todo' as any,
        description: 'todo' as any,
        subtotal: rawPriceToFormatted(item.quantity * item.price.raw),
      })),
      live: {
        subtotal: rawPriceToFormatted(cart.subtotal.raw),

        total: rawPriceToFormatted(cart.subtotal.raw),
      },
    };
  }
  async captureCheckout(checkoutTokenId: string, newOrder: CheckoutCapture): Promise<CheckoutCaptureResponse> {
    const cartId = OrdersService.cartId;
    const { firstname, lastname, email, phoneNumber } = newOrder.customer;
    const data = await makeHttpRequest(
      `${this.apiBaseUrl}/checkout/${cartId}`,
      'POST',
      {
        firstName: firstname,
        lastName: lastname,
        email,
        phone: phoneNumber,
      },
      'json'
    );
    const { id: orderId } = data;
    const orderInfo: GetOrderDTO = await makeHttpRequest(`${this.apiBaseUrl}/${orderId}`, 'GET', undefined, 'json');

    return {
      id: orderInfo.id,
      cart_id: cartId,
      created: new Date(orderInfo.date).getTime(),
      // currency: Currency;
      order_value: rawPriceToFormatted(orderInfo.total),
      customer: {
        email,
        firstname: orderInfo.firstName,
        lastname: orderInfo.lastName,
      },
      customer_reference: orderInfo.id,
    } as any;
  }
}

export default OrdersService;
