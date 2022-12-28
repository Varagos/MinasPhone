import express from 'express';
import { SessionRequest } from 'supertokens-node/framework/express/index.js';
import { middleware } from '../../../../../../shared/infra/http/index.js';
import { createCategoryController } from '../../../use-cases/categories/CreateCategory/index.js';
import { deleteCategoryController } from '../../../use-cases/categories/DeleteCategory/index.js';
import { getAllCategoriesController } from '../../../use-cases/categories/GetAllCategories/index.js';
import { getOneCategoryController } from '../../../use-cases/categories/GetOneCategory/index.js';
import { updateCategoryController } from '../../../use-cases/categories/UpdateCategory/index.js';

const categoryRouter = express.Router();

categoryRouter.post(
  '/',
  middleware.ensureAdmin(),
  (req: SessionRequest, res) => {
    return createCategoryController.execute(req, res);
  },
);

categoryRouter.get('/', (req, res) =>
  getAllCategoriesController.execute(req, res),
);

categoryRouter.get('/:id', (req, res) =>
  getOneCategoryController.execute(req, res),
);

categoryRouter.put('/:id', middleware.ensureAdmin(), (req, res) =>
  updateCategoryController.execute(req, res),
);
categoryRouter.delete('/:id', middleware.ensureAdmin(), (req, res) =>
  deleteCategoryController.execute(req, res),
);

export { categoryRouter };
