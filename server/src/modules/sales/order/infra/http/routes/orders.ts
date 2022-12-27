import express from 'express';
import { validationResult } from 'express-validator';
import {
  queryFilterMiddleware,
  queryRangeMiddleware,
  querySortMiddleware,
} from '../../../../../../shared/infra/http/utils/SchemaValidators.js';
import { captureCheckoutController } from '../../../use-cases/CaptureCheckout/index.js';
import { getOneOrderController } from '../../../use-cases/GetOneOrder/index.js';
import { getOrderListController } from '../../../use-cases/GetOrderList/index.js';
import { updateOrderStatusController } from '../../../use-cases/UpdateOrderStatus/index.js';

const checkoutRouter = express.Router();

checkoutRouter.post('/checkout/:cart_id', (req, res) => {
  return captureCheckoutController.execute(req, res);
});

checkoutRouter.get('/:order_id', (req, res) => {
  return getOneOrderController.execute(req, res);
});

checkoutRouter.get(
  '/',
  querySortMiddleware(),
  queryRangeMiddleware(),
  queryFilterMiddleware(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return getOrderListController.execute(req as any, res);
  },
);

checkoutRouter.put('/:order_id', (req, res) => {
  return updateOrderStatusController.execute(req, res);
});

export { checkoutRouter };
