import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  const Cart = sequelize.define(
    'Cart',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
