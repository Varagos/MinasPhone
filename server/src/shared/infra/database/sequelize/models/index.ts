import { connection as sequelize } from '../config';
import createUser from './User';
import createProduct from './Product';
import createCategory from './Category';
import createOrder from './Order';
import createOrderItem from './OrderItem';
import createCart from './Cart';
import createCartItem from './CartItem';

const createModels = () => {
  const models: Record<string, any> = {};
  models.User = createUser(sequelize);
  models.Product = createProduct(sequelize);
  models.Category = createCategory(sequelize);
  models.Order = createOrder(sequelize);
  models.OrderItem = createOrderItem(sequelize);
  models.Cart = createCart(sequelize);
  models.CartItem = createCartItem(sequelize);
  sequelize.sync({ alter: true, force: true }).then(() => {
    // console.log('All models were synchronized successfully.');
  });

  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
  // console.log({ models });
  return models;
};

export default createModels();

export { createModels };
