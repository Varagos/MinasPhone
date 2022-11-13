import express from 'express';
import { categoryRouter } from '../../../../modules/sales/productCatalog/infra/http/routes/category';
import { productRouter } from '../../../../modules/sales/productCatalog/infra/http/routes/products';
import { cartRouter } from '../../../../modules/sales/cart/infra/http/routes/cart';
import { userRouter } from '../../../../modules/auth/infra/http/routes';

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
  return res.json({ message: "Yo! we're up" });
});

v1Router.use('/users', userRouter);
v1Router.use('/categories', categoryRouter);
v1Router.use('/products', productRouter);
v1Router.use('/carts', cartRouter);

export { v1Router };
