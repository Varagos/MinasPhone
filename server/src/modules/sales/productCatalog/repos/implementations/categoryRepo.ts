import { CategoryDetails } from '../../domain/CategoryDetails.js';
import { CategoryMap } from '../../mappers/CategoryMap.js';
import { Category } from '../../domain/Category.js';
import { ICategoryRepo } from '../categoryRepo.js';
import { CategoryDetailsMap } from '../../mappers/CategoryDetailsMap.js';
import { Repository } from 'typeorm';
import { Category as PersistenceCategory } from '../../../../../shared/infra/database/typeorm/models/index.js';

export class CategoryRepo implements ICategoryRepo {
  constructor(private repo: Repository<PersistenceCategory>) {}

  async getAll(): Promise<CategoryDetails[]> {
    const rawCategories = await this.repo.find();
    const categories = rawCategories.map((cat: PersistenceCategory) =>
      CategoryDetailsMap.toDomain(cat),
    );
    return categories;
  }

  async getOneById(id: string): Promise<CategoryDetails> {
    const rawCategory = await this.repo.findOne({
      where: {
        id,
      },
    });
    // TODO - handle not found
    if (!rawCategory) throw new Error('Category not found');
    const category = CategoryDetailsMap.toDomain(rawCategory);
    return category;
  }

  async save(category: Category): Promise<any> {
    const rawCategory = CategoryMap.toPersistence(category);
    const categoryModel = this.repo.create(rawCategory);

    try {
      await this.repo.save(categoryModel);
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repo.delete(id);
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }
}
