import { EmptyCart } from './EmptyCart.js';
import { EmptyCartController } from './EmptyCartController.js';
import { cartRepo } from '../../repositories/index.js';

const emptyCart = new EmptyCart(cartRepo);
const emptyCartController = new EmptyCartController(emptyCart);

export { emptyCartController };
