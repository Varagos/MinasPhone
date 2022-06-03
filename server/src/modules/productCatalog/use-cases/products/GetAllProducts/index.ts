import { GetAllProducts } from './GetAllProducts';
import { productRepo } from '../../../repos';
import { GetAllCategoriesController } from './GetAllProductsController';

const getAllProducts = new GetAllProducts(productRepo);
const getAllProductsController = new GetAllCategoriesController(getAllProducts);

export { getAllProducts, getAllProductsController };
