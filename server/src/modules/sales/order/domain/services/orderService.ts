import { Cart } from '../../../cart/domain/Cart.js';
import { Product } from '../../../productCatalog/domain/Product.js';
import { Order } from '../Order.js';

export class OrderService {
  public captureOder(cart: Cart, products: Product[]): Order {
    return 'todo' as any;
  }
}
