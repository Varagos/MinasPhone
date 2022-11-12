import { UpdateCart } from './UpdateCart';
import { UpdateCartController } from './UpdateCartController';
import { cartRepo } from '../../repositories';

const updateCart = new UpdateCart(cartRepo);
const updateCartController = new UpdateCartController(updateCart);

export { updateCart, updateCartController };
