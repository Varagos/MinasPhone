import { connection as sequelize } from '../config.js';
import createUser from './User.js';
import createProduct from './Product.js';
import createCategory from './Category.js';
import createOrder from './Order.js';
import createOrderItem from './OrderItem.js';
import createCart from './Cart.js';
import createCartItem from './CartItem.js';

const createModels = () => {
  const models: Record<string, any> = {};
  models.User = createUser(sequelize);
  models.Product = createProduct(sequelize);
  models.Category = createCategory(sequelize);
  models.Order = createOrder(sequelize);
  models.OrderItem = createOrderItem(sequelize);
  models.Cart = createCart(sequelize);
  models.CartItem = createCartItem(sequelize);
  sequelize.sync({ alter: true }).then(() => {
    console.log('All models were synchronized successfully.');
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
