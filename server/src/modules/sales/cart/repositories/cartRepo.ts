import { Cart } from '../domain/Cart';
import { CartDetails } from '../domain/CartDetails';

export interface ICartRepo {
  retrieve(cartId: string): Promise<Cart>;
  retrieveByUser(userId: string): Promise<Cart>;
  retrieveDetails(cartId: string): Promise<CartDetails>;
  retrieveDetailsByUser(userId: string): Promise<CartDetails>;
  save(cart: Cart): Promise<void>;
  // save(category: Category): Promise<void>;
  // update(category: Category): Promise<void>;
  // delete(id: string): Promise<void>;
}
