import { DeleteCart } from './DeleteCart.js';
import { DeleteCartController } from './DeleteCartController.js';
import { cartRepo } from '../../repositories/index.js';

const deleteCart = new DeleteCart(cartRepo);
const deleteCartController = new DeleteCartController(deleteCart);

export { deleteCart, deleteCartController };
