import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  const CartItem = sequelize.define(
    'CartItem',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
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
