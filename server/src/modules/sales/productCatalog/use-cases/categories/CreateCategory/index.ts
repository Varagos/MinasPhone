import { CreateCategory } from './CreateCategory.js';
import { categoryRepo } from '../../../repos/index.js';
import { CreateCategoryController } from './CreateCategoryController.js';

const createCategory = new CreateCategory(categoryRepo);
const createCategoryController = new CreateCategoryController(createCategory);

export { createCategory, createCategoryController };
