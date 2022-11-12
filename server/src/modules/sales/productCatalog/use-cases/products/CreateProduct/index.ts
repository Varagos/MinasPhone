import { imagesService } from '../../../infra/imagesFileSystem';
import { productRepo } from '../../../repos';
import { CreateProduct } from './CreateProduct';
import { CreateProductController } from './CreateProductController';

const createProduct = new CreateProduct(productRepo, imagesService);
const createProductController = new CreateProductController(createProduct);

export { createProduct, createProductController };
