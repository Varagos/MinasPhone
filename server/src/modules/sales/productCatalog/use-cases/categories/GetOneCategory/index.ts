import { GetOneCategory } from './GetOneCategory.js';
import { categoryRepo } from '../../../repos/index.js';
import { GetOneCategoryController } from './GetOneCategoryController.js';

const getOneCategory = new GetOneCategory(categoryRepo);
const getOneCategoryController = new GetOneCategoryController(getOneCategory);

export { getOneCategory, getOneCategoryController };
