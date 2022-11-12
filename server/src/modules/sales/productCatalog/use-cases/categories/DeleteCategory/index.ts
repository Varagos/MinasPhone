import { DeleteCategory } from './DeleteCategory';
import { categoryRepo } from '../../../repos';
import { DeleteCategoryController } from './DeleteCategoryController';

const deleteCategory = new DeleteCategory(categoryRepo);
const deleteCategoryController = new DeleteCategoryController(deleteCategory);

export { deleteCategory, deleteCategoryController };
