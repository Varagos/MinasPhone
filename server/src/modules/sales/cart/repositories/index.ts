import models from '../../../../shared/infra/database/sequelize/models/index.js';
import { ICartRepo } from './cartRepo.js';
import { CartRepo } from './implementations/sequelizeCartRepo.js';

// // console.log({ models });
const cartRepo: ICartRepo = new CartRepo(models);

export { cartRepo };
