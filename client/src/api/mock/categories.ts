import { PaginatedRequest } from '../types/common';
import {
  Category,
  CategoryPaginatedResponse,
  FindCategoriesDto,
  ICategoriesApi,
} from '../types/types';

// TODO add setTimeout to simulate network latency
export class CategoriesApi implements ICategoriesApi {
  findMany(
    params: PaginatedRequest<FindCategoriesDto>
  ): Promise<CategoryPaginatedResponse> {
    throw new Error('Method not implemented.');
  }
  private data: Category[] = [
    {
      id: '1',
      name: 'Smartphones',
      slug: 'smartphones',
      createdAt: '2021-06-24T00:00:00.000Z',
      updatedAt: '2021-06-24T00:00:00.000Z',
    },
    {
      id: '2',
      name: 'Smartwatches',
      slug: 'smartwatches',
      createdAt: '2021-06-24T00:00:00.000Z',
      updatedAt: '2021-06-24T00:00:00.000Z',
    },
    {
      id: '3',
      name: 'Tablets',
      slug: 'tablets',
      createdAt: '2021-06-24T00:00:00.000Z',
      updatedAt: '2021-06-24T00:00:00.000Z',
    },
    {
      id: '4',
      name: 'Accessories',
      slug: 'accessories',
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
