import { IProductsService, Product } from '../index';
import { DataProvider } from '../../httpClient';

class ProductsService implements IProductsService {
  private dataProvider = new DataProvider('products');

  async fetchAll(): Promise<Product[]> {
    const result = await this.dataProvider.getList({
      pagination: {
        page: 1,
        perPage: 100,
      },
      sort: {
        field: 'id',
        order: 'ASC',
      },
      filter: {},
    });
    return result;
  }

  async fetchAllByCategorySlug(categorySlug: string): Promise<Product[]> {
    const data = await this.dataProvider.getList({
      filter: {
        category_slug: categorySlug,
      },
      pagination: {
        page: 1,
        perPage: 100,
      },
      sort: {
        field: 'id',
        order: 'ASC',
      },
    });
    return data;
  }

  async fetchItemById(productId: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
}

export default ProductsService;
