import {
  Either,
  left,
  Result,
  right,
} from '../../../../../shared/core/Result.js';
import { Cart } from '../../../cart/domain/Cart.js';
import { CaptureCheckoutErrors } from '../../use-cases/CaptureCheckout/Errors.js';
import { OrderContactInfoProps } from '../ContactInfo.js';
import { OrderItem } from '../item/OrderItem.js';
import { Order } from '../Order.js';

export class OrderService {
  public captureOder(
    cart: Cart,
    contactInfo: OrderContactInfoProps,
  ): Either<CaptureCheckoutErrors.CartIsEmpty, Result<Order>> {
    const cartLineItems = cart.lineItems;
    if (cartLineItems.length === 0) {
      return left(new CaptureCheckoutErrors.CartIsEmpty());
    }
    const orderItems = cartLineItems.map((cartLineItem) => {
      const productId = cartLineItem.productId;
      const quantity = cartLineItem.quantity;
      const unitPrice = cartLineItem.unitPrice;
      const orderItemOrError = OrderItem.create({
        productId,
        quantity,
        unitPrice,
      });
      if (orderItemOrError.isFailure) {
        throw new Error('OrderItem creation failed');
      }
      return orderItemOrError.getValue();
    });
    return right(Order.create({ items: orderItems, contactInfo }));
  }
}
