import { UpdateCategory } from './UpdateCategory';
import { categoryRepo } from '../../repos';
import { UpdateCategoryController } from './UpdateCategoryController';

const updateCategory = new UpdateCategory(categoryRepo);
const updateCategoryController = new UpdateCategoryController(updateCategory);

export { updateCategory, updateCategoryController };
