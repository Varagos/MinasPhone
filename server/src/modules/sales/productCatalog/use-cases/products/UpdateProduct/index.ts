import { imagesService } from '../../../infra/imagesFileSystem/index.js';
import { productRepo } from '../../../repos/index.js';
import { UpdateProduct } from './UpdateProduct.js';
import { UpdateProductController } from './UpdateProductController.js';

const updateProduct = new UpdateProduct(productRepo, imagesService);
const updateProductController = new UpdateProductController(updateProduct);

export { updateProduct, updateProductController };
