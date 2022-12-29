import { cartRepo } from '../../../cart/repositories/index.js';
import { orderService } from '../../domain/services/index.js';
import { orderRepo } from '../../repos/index.js';
import { CaptureCheckout } from './CaptureCheckout.js';
import { CaptureCheckoutController } from './CaptureCheckoutController.js';

const captureCheckout = new CaptureCheckout(orderRepo, orderService, cartRepo);
const captureCheckoutController = new CaptureCheckoutController(
  captureCheckout,
);

export { captureCheckout, captureCheckoutController };
