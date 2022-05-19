import { connection as sequelize } from '../config';
import createUser from './User';
import createProduct from './Product';
import createCategory from './Category';
import createCart from './Cart';

const createModels = async () => {
  createUser(sequelize);
  createProduct(sequelize);
  createCategory(sequelize);
  createCart(sequelize);
  await sequelize.sync({ alter: true });
  console.log('All models were synchronized successfully.');
};

createModels();
