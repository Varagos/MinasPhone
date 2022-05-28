import { CategoryMap } from './../../mappers/CategoryMap';
import { Category } from './../../domain/Category';
import { ICategoryRepo } from '../categoryRepo';

export class CategoryRepo implements ICategoryRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
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
}
