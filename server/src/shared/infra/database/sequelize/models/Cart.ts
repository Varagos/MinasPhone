// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Sequelize, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  const Cart = sequelize.define(
    'Cart',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: 'carts',
      timestamps: true,
    },
  );

  (Cart as any).associate = (models: any) => {
    Cart.hasMany(models.CartItem, {
      foreignKey: 'cart_id',
    });

    Cart.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };
  return Cart;
};
