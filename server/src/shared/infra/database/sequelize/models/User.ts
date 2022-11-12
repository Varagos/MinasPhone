import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
    },
  );

  (User as any).associate = (models: any) => {
    User.hasMany(models.Order, {
      foreignKey: 'user_id',
    });

    User.hasOne(models.Cart, {
      foreignKey: 'user_id',
    });
  };
  return User;
};
