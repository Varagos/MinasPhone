// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Sequelize, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  const CartItem = sequelize.define(
    'CartItem',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,

        validate: {
          min: 1,
        },
      },
    },
    {
      tableName: 'cart_items',
      timestamps: true,
    },
  );

  (CartItem as any).associate = (models: any) => {
    CartItem.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product',
    });

    CartItem.belongsTo(models.Cart, {
      foreignKey: 'cart_id',
      as: 'cart',
    });
  };
  return CartItem;
};
