import { routes } from './config';
import { fetcher } from './common/fetcher';
import {
  ProductRequest,
  ProductPaginatedResponse,
  Product,
  IProductsApi,
  ProductSlug,
} from '../types/types';
import {
  Api,
  HttpClient,
  ProductPaginatedResponseDto,
  ProductSlugsPaginatedResponseDto,
} from './api';

class ProductsApi implements IProductsApi {
  private httpClient: Api<any>;

  constructor() {
    // console.log('baseUrl', routes.v1.baseUrl);
    this.httpClient = new Api({
      baseUrl: routes.v1.baseUrl,
    });
  }
  async findAllProductSlugs(): Promise<ProductSlug[]> {
    const response =
      await this.httpClient.api.productsHttpControllerFindAllProductSlugs();

    if (!response.ok) {
      console.error('Failed to fetch product slugs', response);
      throw new Error('Failed to fetch product slugs');
    }
    const data = (await response.json()) as ProductSlugsPaginatedResponseDto;
    return data.data;
  }
  // return { useProducts, useProduct };
  async findMany(params: ProductRequest): Promise<ProductPaginatedResponse> {
    const { range, order, filter } = params;

    const url = routes.v1.products.findMany(range, order, filter);

    const res = await fetch(url);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      console.error('Failed to find many products', res);
      if (res.status === 404) return { data: [], count: 0, limit: 0, page: 0 };
      // This will activate the closest `error.js` Error Boundary

      throw new Error('Failed to find many products');
    }

    const json = await res.json();

    // console.log(json);
    return json;
  }

  async findOneById(id: string): Promise<Product | null> {
    const res = await fetch(routes.v1.products.fineOne(id));

    if (!res.ok) {
      if (res.status === 404) {
        return null; // Not found
      }

      console.error('Failed to find product by id', res);
      throw new Error('Failed to find product by id');
    }

    return res.json();
  }
}

export default ProductsApi;
