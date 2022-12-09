// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Sequelize, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  const Category = sequelize.define(
    'Category',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      parent_id: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: 'categories',
      timestamps: true,
    },
  );

  (Category as any).associate = (models: any) => {
    Category.hasMany(models.Product, {
      foreignKey: 'category_id',
    });
  };
  return Category;
};
