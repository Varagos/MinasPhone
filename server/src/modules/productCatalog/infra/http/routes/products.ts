import express from 'express';
import { createProductController } from '../../../use-cases/products/CreateProduct';

const productRouter = express.Router();

productRouter.post('/', (req, res) =>
  createProductController.execute(req, res),
);

// productRouter.get('/', (req, res) =>
//   getAllCategoriesController.execute(req, res),
// );

// productRouter.put('/:id', (req, res) =>
//   updateCategoryController.execute(req, res),
// );
// productRouter.delete('/:id', (req, res) =>
//   deleteCategoryController.execute(req, res),
// );

export { productRouter };
