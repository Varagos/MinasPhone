import express from 'express';
import { retrieveCartController } from '../../../useCases/retrieveCart/index.js';
import { addToCartController } from '../../../useCases/addToCart/index.js';
import { updateCartController } from '../../../useCases/updateCart/index.js';
import { removeFromCartController } from '../../../useCases/removeFromCart/index.js';
import { deleteCartController } from '../../../useCases/deleteCart/index.js';
import { emptyCartController } from '../../../useCases/emptyCart/index.js';
import { createCartController } from '../../../useCases/createCart/index.js';

const cartRouter = express.Router();

cartRouter.get('/', (req, res) => retrieveCartController.execute(req, res));
cartRouter.post('/', (req, res) => createCartController.execute(req, res));

cartRouter.post('/add', (req, res) => addToCartController.execute(req, res));

cartRouter.put('/items/:line_item_id', (req, res) =>
  updateCartController.execute(req, res),
);

cartRouter.delete('/items/:line_item_id', (req, res) =>
  removeFromCartController.execute(req, res),
);

cartRouter.delete('/', (req, res) => deleteCartController.execute(req, res));
cartRouter.delete('/items', (req, res) =>
  emptyCartController.execute(req, res),
);

export { cartRouter };
