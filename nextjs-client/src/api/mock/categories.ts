import { Category, ICategoriesApi } from '../types';

// TODO add setTimeout to simulate network latency
export class CategoriesApi implements ICategoriesApi {
  private data: Category[] = [
    {
      id: '1',
      name: 'Accessories',
      slug: 'accessories',
      createdAt: '2021-06-24T00:00:00.000Z',
      updatedAt: '2021-06-24T00:00:00.000Z',
    },
    {
      id: '2',
      name: 'Smartphones',
      slug: 'smartphones',
      createdAt: '2021-06-24T00:00:00.000Z',
      updatedAt: '2021-06-24T00:00:00.000Z',
    },
  ];
  useCategories() {
    return {
      categories: {
        count: 2,
        limit: 10,
        page: 1,
        data: this.data,
      },
      isLoading: false,
      isError: false,
    };
  }

  useCategory(id: string) {
    const data = this.data.find((category) => category.id === id);
    if (!data) throw new Error(`Category with id ${id} not found`);

    return {
      category: data,
      isLoading: false,
      isError: false,
    };
  }
}
