import { PaginatedQueryParams, RepositoryPort } from '@libs/ddd';
import { ProductEntity } from '../product.entity';

export interface FindProductParams extends PaginatedQueryParams {
  readonly country?: string;
  readonly postalCode?: string;
  readonly street?: string;
}

export interface ProductRepositoryPort extends RepositoryPort<ProductEntity> {
  findBySlug(slug: string): Promise<ProductEntity | null>;
  findByCategoryId(categoryId: string): Promise<ProductEntity[]>;
  findManyByIds(ids: string[]): Promise<ProductEntity[]>;
  updateMany(products: ProductEntity[]): Promise<void>;
}
