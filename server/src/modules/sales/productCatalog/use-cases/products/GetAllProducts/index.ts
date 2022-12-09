import { GetAllProducts } from './GetAllProducts.js';
import { productRepo } from '../../../repos/index.js';
import { GetAllProductsController } from './GetAllProductsController.js';

const getAllProducts = new GetAllProducts(productRepo);
const getAllProductsController = new GetAllProductsController(getAllProducts);

export { getAllProducts, getAllProductsController };
