import { ICategoriesService, CategoryCollection } from '..';
import { mockCategory as mockCategories } from './mockData';

class MockCategoriesService implements ICategoriesService {
  private categories: CategoryCollection = mockCategories;
  async fetchAll(): Promise<CategoryCollection> {
    return structuredClone(this.categories);
  }
}

export default MockCategoriesService;
