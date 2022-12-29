import { orderRepo } from '../../repos/index.js';
import { UpdateOrderStatus } from './UpdateOrderStatus.js';
import { UpdateOrderStatusController } from './UpdateOrderStatusController.js';

const updateOrderStatus = new UpdateOrderStatus(orderRepo);
const updateOrderStatusController = new UpdateOrderStatusController(
  updateOrderStatus,
);

export { updateOrderStatusController }
