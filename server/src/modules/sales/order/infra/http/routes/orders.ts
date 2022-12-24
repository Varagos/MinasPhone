import express from 'express';
import { captureCheckoutController } from '../../../use-cases/CaptureCheckout/index.js';

const checkoutRouter = express.Router();

checkoutRouter.post('/:cart_id', (req, res) => {
  return captureCheckoutController.execute(req, res);
});

export { checkoutRouter };
