import { RetrieveCart } from './RetrieveCart.js';
import { RetrieveCartController } from './RetrieveCartController.js';
import { cartRepo } from '../../repositories/index.js';
import { createCart } from './createCart/index.js';

const retrieveCart = new RetrieveCart(cartRepo);
const retrieveCartController = new RetrieveCartController(
  retrieveCart,
  createCart,
);

export { retrieveCart, retrieveCartController };
