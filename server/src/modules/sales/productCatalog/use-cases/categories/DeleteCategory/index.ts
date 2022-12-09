import { DeleteCategory } from './DeleteCategory.js';
import { categoryRepo } from '../../../repos/index.js';
import { DeleteCategoryController } from './DeleteCategoryController.js';

const deleteCategory = new DeleteCategory(categoryRepo);
const deleteCategoryController = new DeleteCategoryController(deleteCategory);

export { deleteCategory, deleteCategoryController };
