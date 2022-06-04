import { GetOneProduct } from './GetOneProduct';
import { productRepo } from '../../../repos';
import { GetOneProductController } from './GetOneProductController';

const getOneProduct = new GetOneProduct(productRepo);
const getOneProductController = new GetOneProductController(getOneProduct);

export { getOneProduct, getOneProductController };
