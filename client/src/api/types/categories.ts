import { PaginatedRequest, PaginatedResponse } from './common';

export type FindCategoriesDto = {
  slug?: string;
  name?: string;
  parentId?: string;
};

export interface Category {
  id: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  name: string;
  parentId?: string; // Assuming parentId can be optional
}

export type CategoryPaginatedResponse = PaginatedResponse<Category>;

export interface ICategoriesApi {
  findMany(
    params: PaginatedRequest<FindCategoriesDto>
  ): Promise<CategoryPaginatedResponse>;
}
