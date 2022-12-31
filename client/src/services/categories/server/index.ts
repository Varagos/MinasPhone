import { CategoryCollection, ICategoriesService } from '../index';
import { DataProvider } from '../../httpClient';

type CategoryDTO = {
  id: string;
  slug: string;
  name: string;
};

class CategoriesService implements ICategoriesService {
  private dataProvider = new DataProvider<CategoryDTO>('categories');

  async fetchAll(): Promise<CategoryCollection> {
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
    const { data } = result;
    return {
      data: data.map((x) => ({
        id: x.id,
        slug: x.id,
        name: x.name,
        description: 'Blablabla',
        products: 42,
        created: 0,
        meta: {} as any,
      })),
      meta: {} as any,
    };
  }
}

export default CategoriesService;
