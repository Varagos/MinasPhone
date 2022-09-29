import { IProductsService, Product } from '..';
import { mockProducts } from './mockData';

class MockProductsService implements IProductsService {
  private products: Product[] = mockProducts;
  async fetchAll(): Promise<Product[]> {
    return structuredClone(this.products);
  }

  async fetchAllByCategorySlug(categorySlug: string): Promise<Product[]> {
    const result = this.products.filter((product) => {
      return product.categories.some((category) => {
        return category.slug === categorySlug;
      });
    });
    return structuredClone(result);
  }
}

export default MockProductsService;
