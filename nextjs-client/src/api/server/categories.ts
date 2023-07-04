import useSWR from 'swr';
import { routes } from './config';
import { fetcher } from './common/fetcher';
import { Category, CategoryPaginatedResponse, ICategoriesApi } from '../types';

export class CategoriesApi implements ICategoriesApi {
  useCategories(limit: number, page: number) {
    const { data, error, isLoading } = useSWR<CategoryPaginatedResponse>(
      routes.v1.categories.findMany(limit, page),
      fetcher
    );

    return {
      categories: data ?? null,
      isLoading,
      isError: error,
    };
  }

  useCategory(id: string) {
    const { data, error, isLoading } = useSWR<Category>(
      routes.v1.categories.fineOne(id),
      fetcher
    );

    return {
      category: data ?? null,
      isLoading,
      isError: error,
    };
  }
}
