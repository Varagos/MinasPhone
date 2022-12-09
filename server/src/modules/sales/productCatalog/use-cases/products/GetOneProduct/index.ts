import { GetOneProduct } from './GetOneProduct.js';
import { productRepo } from '../../../repos/index.js';
import { GetOneProductController } from './GetOneProductController.js';

const getOneProduct = new GetOneProduct(productRepo);
const getOneProductController = new GetOneProductController(getOneProduct);

export { getOneProduct, getOneProductController };
