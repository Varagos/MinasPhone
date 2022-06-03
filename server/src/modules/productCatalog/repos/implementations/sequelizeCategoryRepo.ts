import { CategoryDetails } from './../../domain/CategoryDetails';
import { CategoryMap } from './../../mappers/CategoryMap';
import { Category } from './../../domain/Category';
import { ICategoryRepo } from '../categoryRepo';
import { Model } from 'sequelize';
import { CategoryDetailsMap } from '../../mappers/CategoryDetailsMap';
import { Identifier } from '../../../../shared/domain/Identifier';

export class CategoryRepo implements ICategoryRepo {
  private models: Record<string, any>;

  constructor(models: Record<string, any>) {
    this.models = models;
  }

  async getAll(): Promise<CategoryDetails[]> {
    const CategoryModel = this.models.Category;
    const rawCategories = await CategoryModel.findAll();
    const categories = rawCategories.map((cat: any) =>
      CategoryDetailsMap.toDomain(cat),
    );
    return categories;
  }

  async save(category: Category): Promise<any> {
    const CategoryModel = this.models.Category;
    const rawSequelizeCategory = CategoryMap.toPersistence(category);

    try {
      await CategoryModel.create(rawSequelizeCategory);
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  async update(category: Category): Promise<any> {
    const CategoryModel = this.models.Category;
    const rawSequelizeCategory = CategoryMap.toPersistence(category);

    const { id, ...rest } = rawSequelizeCategory;
    try {
      await CategoryModel.update(rest, {
        where: {
          id,
        },
      });
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  async delete(id: string): Promise<void> {
    const CategoryModel = this.models.Category;

    try {
      await CategoryModel.destroy({
        where: {
          id,
        },
      });
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }
}
