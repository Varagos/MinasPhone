import express from 'express';
import { body, query, validationResult } from 'express-validator';
import { captureCheckoutController } from '../../../use-cases/CaptureCheckout/index.js';
import { getOrderListController } from '../../../use-cases/GetOrderList/index.js';

const checkoutRouter = express.Router();

checkoutRouter.post('/checkout/:cart_id', (req, res) => {
  return captureCheckoutController.execute(req, res);
});

checkoutRouter.get(
  '/',
  query('sort')
    .optional()
    .custom((value) => {
      const sort = JSON.parse(value);
      if (sort.length !== 2) {
        return Promise.reject('Sort must be an array of 2 elements');
      }
      if (typeof sort[0] !== 'string') {
        return Promise.reject('Sort field must be a string');
      }
      if (!['ASC', 'DESC'].includes(sort[1])) {
        return Promise.reject('Sort order must be ASC or DESC');
      }
      return Promise.resolve();
    })
    .customSanitizer((value) => {
      return JSON.parse(value);
    }),
  query('range')
    .optional()
    .custom((value) => {
      const range = JSON.parse(value);
      if (range.length !== 2) {
        return Promise.reject('Range must be an array of 2 elements');
      }
      if (typeof range[0] !== 'number' || typeof range[1] !== 'number') {
        return Promise.reject('Range must be an array of 2 numbers');
      }
      return Promise.resolve();
    })
    .customSanitizer((value) => {
      return JSON.parse(value);
    }),
  query('filter')
    .optional()
    .isJSON()
    .customSanitizer((value) => {
      return JSON.parse(value);
    }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return getOrderListController.execute(req as any, res);
  },
);

export { checkoutRouter };
