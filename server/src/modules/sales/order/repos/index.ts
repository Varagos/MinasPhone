import { REPOSITORIES } from '../../../../shared/infra/database/typeorm/index.js';
import { OrderRepo } from './implementations/orderRepo.js';
import { IOrderRepo } from './orderRepo.js';

const orderRepo: IOrderRepo = new OrderRepo(REPOSITORIES.ORDER);

export { orderRepo };
