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
  useCategories(params: PaginatedRequest<FindCategoriesDto>): {
    categories: CategoryPaginatedResponse | null;
    isLoading: boolean;
    isError: any;
  } {
    throw new Error('Method not implemented.');
  }
  useCategory(id: string): {
    category: Category | null;
    isLoading: boolean;
    isError: any;
  } {
    throw new Error('Method not implemented.');
  }
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
  // useCategories({
  //   limit,
  //   page,
  //   slug,
  //   name,
  //   parentId,
  // }: PaginatedRequest<FindCategoriesDto>) {
  //   const { data, error, isLoading } = useSWR<CategoryPaginatedResponse>(
  //     [
  //       routes.v1.categories.findMany(limit, page),
  //       {
  //         slug,
  //         name,
  //         parentId,
  //       },
  //     ],
  //     fetcher
  //   );

  //   return {
  //     categories: data ?? null,
  //     isLoading,
  //     isError: error,
  //   };
  // }

  // useCategory(id: string) {
  //   const { data, error, isLoading } = useSWR<Category>(
  //     routes.v1.categories.fineOne(id),
  //     fetcher
  //   );

  //   return {
  //     category: data ?? null,
  //     isLoading,
  //     isError: error,
  //   };
  // }
}
