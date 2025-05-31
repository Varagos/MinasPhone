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
    const { range, order, filter } = params;

    const url = routes.v1.products.findMany(range, order, filter);

    const res = await fetch(url);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }

    const json = await res.json();

    // console.log(json);
    return json;
  }

  async findOneById(id: string): Promise<Product> {
    const res = await fetch(routes.v1.products.fineOne(id));

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }
}

export default ProductsApi;
