import { AddToCart } from './AddToCart';
import { AddToCartController } from './AddToCartController';
import { cartRepo } from '../../repositories';

const addToCart = new AddToCart(cartRepo);
const addToCartController = new AddToCartController(addToCart);

export { addToCart, addToCartController };
