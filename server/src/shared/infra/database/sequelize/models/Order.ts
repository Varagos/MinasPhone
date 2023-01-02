// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Sequelize, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  const Order = sequelize.define(
    'Order',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,

        validate: {
          min: 0,
        },
      },
    },
    {
      tableName: 'orders',
      timestamps: true,
    },
  );

  (Order as any).associate = (models: any) => {
    Order.hasMany(models.OrderItem, {
      foreignKey: 'order_id',
    });

    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };
  return Order;
};