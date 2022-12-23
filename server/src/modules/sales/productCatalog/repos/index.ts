import { REPOSITORIES } from '../../../../shared/infra/database/typeorm/index.js';
import { CategoryRepo } from './implementations/categoryRepo.js';
import { ProductRepo } from './implementations/productRepo.js';

const categoryRepo = new CategoryRepo(REPOSITORIES.CATEGORY);
const productRepo = new ProductRepo(REPOSITORIES.PRODUCT);

export { categoryRepo, productRepo };
