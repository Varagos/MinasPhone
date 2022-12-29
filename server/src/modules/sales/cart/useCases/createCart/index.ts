import { CreateCart } from './CreateCart.js';
import { RetrieveCartController } from './CreateCartController.js';
import { cartRepo } from '../../repositories/index.js';

const createCart = new CreateCart(cartRepo);
const createCartController = new RetrieveCartController(createCart);

export { createCart, createCartController };
