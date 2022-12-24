import { REPOSITORIES } from '../../../../shared/infra/database/typeorm/index.js';
import { OrderRepo } from './implementations/orderRepo.js';

const orderRepo = new OrderRepo(REPOSITORIES.ORDER);

export { orderRepo };
