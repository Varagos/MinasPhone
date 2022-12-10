import { Maybe } from '../../../../shared/core/Maybe.js';
import { Cart } from '../domain/Cart.js';
import { CartDetails } from '../domain/CartDetails.js';

export interface ICartRepo {
  retrieve(cartId: string): Promise<Cart>;
  retrieveByUser(userId: string): Promise<Cart>;
  retrieveDetails(cartId: string): Promise<Maybe<CartDetails>>;
  retrieveDetailsByUser(userId: string): Promise<CartDetails>;
  save(cart: Cart): Promise<void>;
  // save(category: Category): Promise<void>;
  // update(category: Category): Promise<void>;
  // delete(id: string): Promise<void>;
}
