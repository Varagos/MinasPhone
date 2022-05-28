import models from '../../../shared/infra/database/sequelize/models';
import { CategoryRepo } from './implementations/sequelizeCategoryRepo';

console.log({ models });
const categoryRepo = new CategoryRepo(models);
console.log({ models });

export { categoryRepo };
