import express from 'express';
import { upload } from '../../../../../../shared/infra/storage/multer.js';
import { createProductController } from '../../../use-cases/products/CreateProduct/index.js';
import { deleteProductController } from '../../../use-cases/products/DeleteProduct/index.js';
import { getAllProductsController } from '../../../use-cases/products/GetAllProducts/index.js';
import { getProductsByFilter } from '../../../use-cases/products/GetByCategorySlug/index.js';
import { getOneProductController } from '../../../use-cases/products/GetOneProduct/index.js';
import { updateProductController } from '../../../use-cases/products/UpdateProduct/index.js';

const productRouter = express.Router();

productRouter.post('/', upload.single('image'), (req, res) => {
  return createProductController.execute(req, res);
});

productRouter.get('/', (req, res) => {
  if (req.query.filter) {
    return getProductsByFilter.execute(req, res);
  }

  return getAllProductsController.execute(req, res);
});

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
