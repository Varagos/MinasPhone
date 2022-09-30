import { connection as sequelize } from '../config';
import createUser from './User';
import createProduct from './Product';
import createCategory from './Category';
import createCart from './Cart';

const createModels = () => {
  const models: Record<string, any> = {};
  models.User = createUser(sequelize);
  models.Product = createProduct(sequelize);
  models.Category = createCategory(sequelize);
  models.Cart = createCart(sequelize);
  sequelize.sync({ alter: true }).then(() => {
    // console.log('All models were synchronized successfully.');
  });
  // console.log({ models });
  return models;
};

export default createModels();

export { createModels };
