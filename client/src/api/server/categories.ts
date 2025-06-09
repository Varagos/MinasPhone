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
  async findCategoryBySlug(slug: string): Promise<Category | null> {
    // Improve this should have a specific backend route, with some index on slug
    const categories = await this.findMany({
      range: [0, 10],
      filter: { slug },
    });
    return categories.data[0] || null;
  }

  async findMany(
    params: PaginatedRequest<FindCategoriesDto, FindCategoriesDto>
  ): Promise<CategoryPaginatedResponse> {
    const { range, filter } = params;
    const res = await fetch(routes.v1.categories.findMany(range, filter));
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to find many categories');
    }

    return res.json();
  }
}
