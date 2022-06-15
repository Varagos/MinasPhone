import { GetOneCategory } from './GetOneCategory';
import { categoryRepo } from '../../../repos';
import { GetOneCategoryController } from './GetOneCategoryController';

const getOneCategory = new GetOneCategory(categoryRepo);
const getOneCategoryController = new GetOneCategoryController(getOneCategory);

export { getOneCategory, getOneCategoryController };
