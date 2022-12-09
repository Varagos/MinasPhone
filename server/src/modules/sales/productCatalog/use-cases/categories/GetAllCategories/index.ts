import { GetAllCategories } from './GetAllCategories.js';
import { categoryRepo } from '../../../repos/index.js';
import { GetAllCategoriesController } from './GetAllCategoriesController.js';

const getAllCategories = new GetAllCategories(categoryRepo);
const getAllCategoriesController = new GetAllCategoriesController(
  getAllCategories,
);

export { getAllCategories, getAllCategoriesController };
