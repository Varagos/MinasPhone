import { productRepo } from '../../../repos';
import { CreateProduct } from './CreateProduct';
import { CreateProductController } from './CreateProductController';

const createProduct = new CreateProduct(productRepo);
const createProductController = new CreateProductController(createProduct);

export { createProduct, createProductController };
