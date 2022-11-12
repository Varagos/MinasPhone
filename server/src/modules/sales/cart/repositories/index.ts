import models from '../../../../shared/infra/database/sequelize/models';
import { ICartRepo } from './cartRepo';
import { CartRepo } from './implementations/sequelizeCartRepo';

// // console.log({ models });
const cartRepo: ICartRepo = new CartRepo(models);

export { cartRepo };
