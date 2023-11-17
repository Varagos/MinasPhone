import { PaginatedRequest, PaginatedResponse } from './common';

export type FindProductsDto = {
  slug?: string;
  categoryId?: string;
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

export type ProductRequest = PaginatedRequest<FindProductsDto>;
export type ProductPaginatedResponse = PaginatedResponse<Product>;

export interface IProductsApi {
  findMany(params: ProductRequest): Promise<ProductPaginatedResponse>;
  findManyByCategorySlug(params: {
    limit: number;
    page: number;
    slug: string;
    range: [number, number];
  }): Promise<ProductPaginatedResponse>;
  findOneById(id: string): Promise<Product>;
}
