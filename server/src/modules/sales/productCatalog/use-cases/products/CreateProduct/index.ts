import { imagesService } from '../../../infra/imagesFileSystem/index.js';
import { productRepo } from '../../../repos/index.js';
import { CreateProduct } from './CreateProduct.js';
import { CreateProductController } from './CreateProductController.js';

const createProduct = new CreateProduct(productRepo, imagesService);
const createProductController = new CreateProductController(createProduct);

export { createProduct, createProductController };
