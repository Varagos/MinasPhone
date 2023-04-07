import { PaginatedQueryParams, RepositoryPort } from '@libs/ddd';
import { CategoryEntity } from '../category.entity';

export interface FindCategoryParams extends PaginatedQueryParams {
  readonly country?: string;
  readonly postalCode?: string;
  readonly street?: string;
}

export interface CategoryRepositoryPort extends RepositoryPort<CategoryEntity> {
  findOneBySlug(slug: string): Promise<CategoryEntity | null>;
}
