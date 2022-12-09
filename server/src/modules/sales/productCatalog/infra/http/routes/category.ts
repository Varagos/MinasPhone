import express from 'express';
import { createCategoryController } from '../../../use-cases/categories/CreateCategory/index.js';
import { deleteCategoryController } from '../../../use-cases/categories/DeleteCategory/index.js';
import { getAllCategoriesController } from '../../../use-cases/categories/GetAllCategories/index.js';
import { getOneCategoryController } from '../../../use-cases/categories/GetOneCategory/index.js';
import { updateCategoryController } from '../../../use-cases/categories/UpdateCategory/index.js';

const categoryRouter = express.Router();

categoryRouter.post('/', (req, res) =>
  createCategoryController.execute(req, res),
);

categoryRouter.get('/', (req, res) =>
  getAllCategoriesController.execute(req, res),
);

categoryRouter.get('/:id', (req, res) =>
  getOneCategoryController.execute(req, res),
);

categoryRouter.put('/:id', (req, res) =>
  updateCategoryController.execute(req, res),
);
categoryRouter.delete('/:id', (req, res) =>
  deleteCategoryController.execute(req, res),
);

export { categoryRouter };
