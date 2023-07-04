import useSWR from 'swr';
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
  useCategories({
    limit,
    page,
    slug,
    name,
    parentId,
  }: PaginatedRequest<FindCategoriesDto>) {
    const { data, error, isLoading } = useSWR<CategoryPaginatedResponse>(
      [
        routes.v1.categories.findMany(limit, page),
        {
          slug,
          name,
          parentId,
        },
      ],
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
