import { UpdateCategory } from './UpdateCategory.js';
import { categoryRepo } from '../../../repos/index.js';
import { UpdateCategoryController } from './UpdateCategoryController.js';

const updateCategory = new UpdateCategory(categoryRepo);
const updateCategoryController = new UpdateCategoryController(updateCategory);

export { updateCategory, updateCategoryController };
