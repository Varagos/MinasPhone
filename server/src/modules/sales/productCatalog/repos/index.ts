import models from '../../../../shared/infra/database/sequelize/models/index.js';
import { CategoryRepo } from './implementations/sequelizeCategoryRepo.js';
import { ProductRepo } from './implementations/sequelizeProductRepo.js';

// // console.log({ models });
const categoryRepo = new CategoryRepo(models);
const productRepo = new ProductRepo(models);

export { categoryRepo, productRepo };
