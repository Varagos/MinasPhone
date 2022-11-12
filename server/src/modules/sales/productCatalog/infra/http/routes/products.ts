import express from 'express';
import { upload } from '../../../../../../shared/infra/storage/multer';
import { createProductController } from '../../../use-cases/products/CreateProduct';
import { deleteProductController } from '../../../use-cases/products/DeleteProduct';
import { getAllProductsController } from '../../../use-cases/products/GetAllProducts';
import { getOneProductController } from '../../../use-cases/products/GetOneProduct';
import { updateProductController } from '../../../use-cases/products/UpdateProduct';

const productRouter = express.Router();

productRouter.post('/', upload.single('image'), (req, res) => {
  return createProductController.execute(req, res);
});

productRouter.get('/', (req, res) =>
  getAllProductsController.execute(req, res),
);

productRouter.get('/:id', (req, res) =>
  getOneProductController.execute(req, res),
);

productRouter.put('/:id', upload.single('image'), (req, res) =>
  updateProductController.execute(req, res),
);

productRouter.delete('/:id', (req, res) =>
  deleteProductController.execute(req, res),
);

export { productRouter };
