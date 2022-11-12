import { RemoveFromCart } from './RemoveFromCart';
import { RemoveFromCartController } from './RemoveFromCartController';
import { cartRepo } from '../../repositories';

const removeFromCart = new RemoveFromCart(cartRepo);
const removeFromCartController = new RemoveFromCartController(removeFromCart);

export { removeFromCart, removeFromCartController };
