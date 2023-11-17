import { routes } from './config';
import { fetcher } from './common/fetcher';
import {
  ICategoriesApi,
  CategoryPaginatedResponse,
  Category,
} from '../types/types';
import { PaginatedRequest } from '../types/common';
import { FindCategoriesDto } from '../types/categories';

export class CategoriesApi implements ICategoriesApi {
  async findMany(
    params: PaginatedRequest<FindCategoriesDto>
  ): Promise<CategoryPaginatedResponse> {
    const { limit, page, slug, name, parentId } = params;

    const res = await fetch(routes.v1.categories.findMany(limit, page));
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }
}
