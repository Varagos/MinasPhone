import { DeleteCart } from './DeleteCart';
import { DeleteCartController } from './DeleteCartController';
import { cartRepo } from '../../repositories';

const deleteCart = new DeleteCart(cartRepo);
const deleteCartController = new DeleteCartController(deleteCart);

export { deleteCart, deleteCartController };
