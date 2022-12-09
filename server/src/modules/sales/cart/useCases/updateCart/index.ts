import { UpdateCart } from './UpdateCart.js';
import { UpdateCartController } from './UpdateCartController.js';
import { cartRepo } from '../../repositories/index.js';

const updateCart = new UpdateCart(cartRepo);
const updateCartController = new UpdateCartController(updateCart);

export { updateCart, updateCartController };
