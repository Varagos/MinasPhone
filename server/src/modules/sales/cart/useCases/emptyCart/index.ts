import { EmptyCart } from './EmptyCart';
import { EmptyCartController } from './EmptyCartController';
import { cartRepo } from '../../repositories';

const emptyCart = new EmptyCart(cartRepo);
const emptyCartController = new EmptyCartController(emptyCart);

export { emptyCartController };
