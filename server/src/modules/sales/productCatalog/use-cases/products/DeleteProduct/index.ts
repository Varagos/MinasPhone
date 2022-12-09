import { DeleteProduct } from './DeleteProduct.js';
import { productRepo } from '../../../repos/index.js';
import { DeleteProductController } from './DeleteProductController.js';
import { imagesService } from '../../../infra/imagesFileSystem/index.js';

const deleteProduct = new DeleteProduct(productRepo, imagesService);
const deleteProductController = new DeleteProductController(deleteProduct);

export { deleteProduct, deleteProductController };
