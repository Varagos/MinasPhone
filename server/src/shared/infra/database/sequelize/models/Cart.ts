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
  return Cart;
};
