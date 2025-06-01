import { PaginatedRequest, PaginatedResponse } from './common';

export type FindProductsDto = {
  slug?: string;
  categoryId?: string;
  categorySlug?: string;
};

export type FindProductsFilter = {
  slug?: string;
  categoryId?: string;
  categorySlug?: string;
};

export interface Product {
  id: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  active: boolean;
  imageUrl: string;
  categoryId: string;
}

export type ProductRequest = PaginatedRequest<
  FindProductsDto,
  FindProductsFilter
>;
export type ProductPaginatedResponse = PaginatedResponse<Product>;

//  * http://domain.com/posts?sort=["title","ASC"]&range=[0, 24]&filter={"title":"bar"}

export interface IProductsApi {
  findMany(params: ProductRequest): Promise<ProductPaginatedResponse>;
  findOneById(id: string): Promise<Product | null>;
}
