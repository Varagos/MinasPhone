import { REPOSITORIES } from '../../../../shared/infra/database/typeorm/index.js';
import { ICartRepo } from './cartRepo.js';
import { CartRepo } from './implementations/cartRepo.js';

// // console.log({ models });
const cartRepo: ICartRepo = new CartRepo(REPOSITORIES.CART);

export { cartRepo };
