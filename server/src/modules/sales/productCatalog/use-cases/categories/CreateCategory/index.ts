import { CreateCategory } from './CreateCategory';
import { categoryRepo } from '../../../repos';
import { CreateCategoryController } from './CreateCategoryController';

const createCategory = new CreateCategory(categoryRepo);
const createCategoryController = new CreateCategoryController(createCategory);

export { createCategory, createCategoryController };
