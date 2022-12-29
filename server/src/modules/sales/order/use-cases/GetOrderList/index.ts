import { GetOrderList } from './GetOrderList.js';
import { GetOrderListController } from './GetOrderListController.js';
import { orderRepo } from '../../repos/index.js';

const getOrderList = new GetOrderList(orderRepo);
export const getOrderListController = new GetOrderListController(getOrderList);
