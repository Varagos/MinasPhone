import express from 'express';
import { createProductController } from '../../../use-cases/products/CreateProduct';
import { getAllProductsController } from '../../../use-cases/products/GetAllProducts';
import { updateProductController } from '../../../use-cases/products/UpdateProduct';

const productRouter = express.Router();

productRouter.post('/', (req, res) =>
  createProductController.execute(req, res),
);

productRouter.get('/', (req, res) =>
  getAllProductsController.execute(req, res),
);

productRouter.put('/:id', (req, res) =>
  updateProductController.execute(req, res),
);
// productRouter.delete('/:id', (req, res) =>
//   deleteCategoryController.execute(req, res),
// );

export { productRouter };
