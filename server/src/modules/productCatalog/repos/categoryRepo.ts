import { Category } from '../domain/Category';
import { CategoryDetails } from '../domain/CategoryDetails';

export interface ICategoryRepo {
  getAll(): Promise<CategoryDetails[]>;
  getOneById(id: string): Promise<CategoryDetails>;
  save(category: Category): Promise<void>;
  update(category: Category): Promise<void>;
  delete(id: string): Promise<void>;
}
