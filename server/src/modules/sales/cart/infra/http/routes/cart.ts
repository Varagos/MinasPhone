import express from 'express';
import { retrieveCartController } from '../../../useCases/retrieveCart';
import { addToCartController } from '../../../useCases/addToCart';
import { updateCartController } from '../../../useCases/updateCart';
import { removeFromCartController } from '../../../useCases/removeFromCart';
import { deleteCartController } from '../../../useCases/deleteCart';
import { emptyCartController } from '../../../useCases/emptyCart';

const cartRouter = express.Router();

cartRouter.get('/', (req, res) => retrieveCartController.execute(req, res));

cartRouter.post('/:id', (req, res) => addToCartController.execute(req, res));

cartRouter.put('/:id/items/:line_item_id', (req, res) =>
  updateCartController.execute(req, res),
);

cartRouter.delete('/:id/items/:line_item_id', (req, res) =>
  removeFromCartController.execute(req, res),
);

cartRouter.delete('/:id', (req, res) => deleteCartController.execute(req, res));
cartRouter.delete('/:id/items', (req, res) =>
  emptyCartController.execute(req, res),
);

export { cartRouter };
