import { AddToCart } from './AddToCart.js';
import { AddToCartController } from './AddToCartController.js';
import { cartRepo } from '../../repositories/index.js';
import { productRepo } from '../../../productCatalog/repos/index.js';

const addToCart = new AddToCart(cartRepo, productRepo);
const addToCartController = new AddToCartController(addToCart);

export { addToCart, addToCartController };
