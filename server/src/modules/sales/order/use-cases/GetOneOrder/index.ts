import { GetOneOrder } from './GetOneOrder.js';
import { GetOneOrderController } from './GetOneOrderController.js';
import { orderRepo } from '../../repos/index.js';

const getOneOrder = new GetOneOrder(orderRepo);
export const getOneOrderController = new GetOneOrderController(getOneOrder);
