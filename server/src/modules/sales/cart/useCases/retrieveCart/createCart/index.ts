import { CreateCart } from './CreateCart.js';
import { cartRepo } from '../../../repositories/index.js';

const createCart = new CreateCart(cartRepo);

export { createCart };
