import { UpdateProduct } from './UpdateProduct';
import { productRepo } from '../../../repos';
import { UpdateProductController } from './UpdateProductController';

const updateProduct = new UpdateProduct(productRepo);
const updateProductController = new UpdateProductController(updateProduct);

export { updateProduct, updateProductController };
