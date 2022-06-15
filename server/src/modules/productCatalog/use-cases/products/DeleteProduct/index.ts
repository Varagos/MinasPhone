import { DeleteProduct } from './DeleteProduct';
import { productRepo } from '../../../repos';
import { DeleteProductController } from './DeleteProductController';

const deleteProduct = new DeleteProduct(productRepo);
const deleteProductController = new DeleteProductController(deleteProduct);

export { deleteProduct, deleteProductController };
