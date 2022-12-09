import { Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      joined_at: {
        type: Sequelize.DATE,
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
