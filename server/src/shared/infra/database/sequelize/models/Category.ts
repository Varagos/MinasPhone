import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  const Category = sequelize.define(
    'Category',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      parent_id: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'categories',
      timestamps: true,
    },
  );
  return Category;
};
