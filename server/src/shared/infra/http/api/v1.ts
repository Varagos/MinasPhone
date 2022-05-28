import express from 'express';
import { categoryRouter } from '../../../../modules/productCatalog/infra/http/routes/category';
import { userRouter } from '../../../../modules/users/infra/http/routes';

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
  return res.json({ message: "Yo! we're up" });
});

v1Router.use('/users', userRouter);
v1Router.use('/categories', categoryRouter);

export { v1Router };
