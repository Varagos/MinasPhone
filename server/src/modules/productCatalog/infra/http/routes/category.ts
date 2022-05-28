import express from 'express';
import { createCategoryController } from '../../../useCases/CreateCategory';

const categoryRouter = express.Router();

categoryRouter.post('/', (req, res) =>
  createCategoryController.execute(req, res),
);

export { categoryRouter };
