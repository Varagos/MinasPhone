import { Category } from '../domain/Category';

export interface ICategoryRepo {
  save(category: Category): Promise<void>;
}
