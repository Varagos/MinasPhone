import Commerce from '@chec/commerce.js';
import { ICategoriesService, CategoryCollection } from '..';

class CommerceJSCategoriesService implements ICategoriesService {
  constructor(private client: Commerce) {}
  async fetchAll(): Promise<CategoryCollection> {
    const result = await this.client.categories.list();
    console.log('categories:', result);
    return structuredClone(result);
  }
}

export default CommerceJSCategoriesService;
