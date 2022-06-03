import express from 'express';
import { createCategoryController } from '../../../use-cases/categories/CreateCategory';
import { deleteCategoryController } from '../../../use-cases/categories/DeleteCategory';
import { getAllCategoriesController } from '../../../use-cases/categories/GetAllCategories';
import { updateCategoryController } from '../../../use-cases/categories/UpdateCategory';

const categoryRouter = express.Router();

categoryRouter.post('/', (req, res) =>
  createCategoryController.execute(req, res),
);

categoryRouter.get('/', (req, res) =>
  getAllCategoriesController.execute(req, res),
);

categoryRouter.put('/:id', (req, res) =>
  updateCategoryController.execute(req, res),
);
categoryRouter.delete('/:id', (req, res) =>
  deleteCategoryController.execute(req, res),
);

export { categoryRouter };
