import { PaginatedQueryParams, RepositoryPort } from '@libs/ddd';
import { OrderEntity } from '../order.entity';

// export interface FindCategoryParams extends PaginatedQueryParams {
//   readonly country?: string;
//   readonly postalCode?: string;
//   readonly street?: string;
// }

export interface OrderRepositoryPort extends RepositoryPort<OrderEntity> {
  findOneBySlug(slug: string): Promise<OrderEntity | null>;
}
