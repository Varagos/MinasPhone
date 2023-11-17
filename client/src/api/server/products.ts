import { routes } from './config';
import { fetcher } from './common/fetcher';
import {
  ProductRequest,
  ProductPaginatedResponse,
  Product,
  IProductsApi,
} from '../types/types';

class ProductsApi implements IProductsApi {
  // return { useProducts, useProduct };
  async findMany(params: ProductRequest): Promise<ProductPaginatedResponse> {
    const { limit, page, slug, categoryId } = params;

    const res = await fetch(routes.v1.products.findMany(limit, page));
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }

  async findOneById(id: string): Promise<Product> {
    const res = await fetch(routes.v1.products.fineOne(id));

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }

  async findManyByCategorySlug(params: {
    limit: number;
    page: number;
    slug: string;
    range: [number, number];
  }): Promise<ProductPaginatedResponse> {
    const { limit, page, slug, range } = params;

    const url = routes.v1.products.findManyByCategorySlug({
      limit,
      page,
      slug,
      range,
    });
    console.log(`findManyByCategorySlug url: ${url}`);
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const response = await res.json();
    console.log(`findManyByCategorySlug response`);
    console.log(response);

    return response;
  }
}

export default ProductsApi;
