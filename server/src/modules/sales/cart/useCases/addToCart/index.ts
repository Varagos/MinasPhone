import { AddToCart } from './AddToCart.js';
import { AddToCartController } from './AddToCartController.js';
import { cartRepo } from '../../repositories/index.js';

const addToCart = new AddToCart(cartRepo);
const addToCartController = new AddToCartController(addToCart);

export { addToCart, addToCartController };
