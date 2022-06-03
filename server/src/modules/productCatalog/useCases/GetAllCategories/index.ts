import { GetAllCategories } from './GetAllCategories';
import { categoryRepo } from '../../repos';
import { GetAllCategoriesController } from './GetAllCategoriesController';

const getAllCategories = new GetAllCategories(categoryRepo);
const getAllCategoriesController = new GetAllCategoriesController(
  getAllCategories,
);

export { getAllCategories, getAllCategoriesController };
