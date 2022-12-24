import { orderRepo } from '../../repos/index.js';
import { CaptureCheckout } from './CaptureCheckout.js';
import { CaptureCheckoutController } from './CaptureCheckoutController.js';

const captureCheckout = new CaptureCheckout(orderRepo, 'todo');
const captureCheckoutController = new CaptureCheckoutController(
  captureCheckout,
);

export { captureCheckout, captureCheckoutController };
