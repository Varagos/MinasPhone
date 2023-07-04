export interface Category {
  id: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  name: string;
  parentId?: string; // Assuming parentId can be optional
}

export interface CategoryPaginatedResponse {
  count: number;
  limit: number;
  page: number;
  data: Category[];
}

export interface ICategoriesApi {
  useCategories(
    limit?: number,
    page?: number
  ): {
    categories: CategoryPaginatedResponse | null;
    isLoading: boolean;
    isError: any;
  };
  useCategory(id: string): {
    category: Category | null;
    isLoading: boolean;
    isError: any;
  };
}
