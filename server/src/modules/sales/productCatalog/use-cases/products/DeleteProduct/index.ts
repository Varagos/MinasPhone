import { DeleteProduct } from './DeleteProduct';
import { productRepo } from '../../../repos';
import { DeleteProductController } from './DeleteProductController';
import { imagesService } from '../../../infra/imagesFileSystem';

const deleteProduct = new DeleteProduct(productRepo, imagesService);
const deleteProductController = new DeleteProductController(deleteProduct);

export { deleteProduct, deleteProductController };
