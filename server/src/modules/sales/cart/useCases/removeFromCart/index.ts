import { RemoveFromCart } from './RemoveFromCart.js';
import { RemoveFromCartController } from './RemoveFromCartController.js';
import { cartRepo } from '../../repositories/index.js';

const removeFromCart = new RemoveFromCart(cartRepo);
const removeFromCartController = new RemoveFromCartController(removeFromCart);

export { removeFromCart, removeFromCartController };
