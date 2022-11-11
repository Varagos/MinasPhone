import { UpdateProduct } from './UpdateProduct';
import { productRepo } from '../../../repos';
import { UpdateProductController } from './UpdateProductController';
import { imagesService } from '../../../infra/imagesFileSystem';

const updateProduct = new UpdateProduct(productRepo, imagesService);
const updateProductController = new UpdateProductController(updateProduct);

export { updateProduct, updateProductController };
