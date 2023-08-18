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
  useProducts(params: ProductRequest): {
    products: ProductPaginatedResponse | null;
    isLoading: boolean;
    isError: any;
  };
  useProduct(id: string): {
    product: Product | null;
    isLoading: boolean;
    isError: any;
  };
}
