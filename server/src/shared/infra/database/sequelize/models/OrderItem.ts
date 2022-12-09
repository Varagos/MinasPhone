// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Sequelize, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  const OrderItem = sequelize.define(
    'OrderItem',
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
      tableName: 'order_items',
      timestamps: true,
    },
  );

  (OrderItem as any).associate = (models: any) => {
    OrderItem.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product',
    });
    OrderItem.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order',
    });
  };
  return OrderItem;
};
