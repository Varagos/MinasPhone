import models from '../../../../shared/infra/database/sequelize/models';
import { CategoryRepo } from './implementations/sequelizeCategoryRepo';
import { ProductRepo } from './implementations/sequelizeProductRepo';

// // console.log({ models });
const categoryRepo = new CategoryRepo(models);
const productRepo = new ProductRepo(models);

export { categoryRepo, productRepo };
