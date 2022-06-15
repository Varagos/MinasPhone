import { GetAllProducts } from './GetAllProducts';
import { productRepo } from '../../../repos';
import { GetAllProductsController } from './GetAllProductsController';

const getAllProducts = new GetAllProducts(productRepo);
const getAllProductsController = new GetAllProductsController(getAllProducts);

export { getAllProducts, getAllProductsController };
