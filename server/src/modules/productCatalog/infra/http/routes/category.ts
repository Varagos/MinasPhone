import express from 'express';
import { createCategoryController } from '../../../useCases/CreateCategory';
import { deleteCategoryController } from '../../../useCases/DeleteCategory';
import { getAllCategoriesController } from '../../../useCases/GetAllCategories';
import { updateCategoryController } from '../../../useCases/UpdateCategory';

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
