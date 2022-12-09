import express from 'express';
import { categoryRouter } from '../../../../modules/sales/productCatalog/infra/http/routes/category.js';
import { productRouter } from '../../../../modules/sales/productCatalog/infra/http/routes/products.js';
import { cartRouter } from '../../../../modules/sales/cart/infra/http/routes/cart.js';

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
  return res.json({ message: "Yo! we're up" });
});

// v1Router.use('/users', userRouter);
v1Router.use('/categories', categoryRouter);
v1Router.use('/products', productRouter);
v1Router.use('/carts', cartRouter);

export { v1Router };
