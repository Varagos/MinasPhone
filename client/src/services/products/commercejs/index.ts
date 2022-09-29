import { IProductsService, Product } from './../index';
import Commerce from '@chec/commerce.js';

class CommerceJSProductsService implements IProductsService {
  constructor(private client: Commerce) {}

  async fetchAll(): Promise<Product[]> {
    const result = await this.client.products.list();
    return structuredClone(result.data) ?? [];
  }

  async fetchAllByCategorySlug(categorySlug: string): Promise<Product[]> {
    const { data } = await this.client.products.list({
      category_slug: [categorySlug],
    });
    return structuredClone(data) ?? [];
  }
}

export default CommerceJSProductsService;
