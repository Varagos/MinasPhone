import express from 'express';
import { body, validationResult } from 'express-validator';
import { middleware } from '../../../../../../shared/infra/http/index.js';
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

// firstName: req.body.firstName,
// lastName: req.body.lastName,
// email: req.body.email,
// phone: req.body.phone,
checkoutRouter.post(
  '/checkout/:cart_id',
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Email is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  (req: express.Request, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return captureCheckoutController.execute(req, res);
  },
);

checkoutRouter.get('/:order_id', (req, res) => {
  return getOneOrderController.execute(req, res);
});

checkoutRouter.get(
  '/',
  middleware.ensureAdmin(),
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

checkoutRouter.put('/:order_id', middleware.ensureAdmin(), (req, res) => {
  return updateOrderStatusController.execute(req, res);
});

export { checkoutRouter };
