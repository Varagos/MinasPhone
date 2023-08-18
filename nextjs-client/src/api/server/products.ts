import { routes } from './config';
import { fetcher } from './common/fetcher';
import {
  ProductRequest,
  ProductPaginatedResponse,
  Product,
  IProductsApi,
} from '../types/types';

class ProductsApi implements IProductsApi {
  useProducts(params: ProductRequest): {
    products: ProductPaginatedResponse | null;
    isLoading: boolean;
    isError: any;
  } {
    throw new Error('Method not implemented.');
  }
  useProduct(id: string): {
    //     fetcher
    product: Product | null; //   return {
    isLoading: boolean;
    isError: any;
  } {
    throw new Error('Method not implemented.');
  }

  // const useProducts = ({ limit, page }: ProductRequest) => {
  //   const { data, error } = useSWR<ProductPaginatedResponse>(
  //     routes.v1.products.findMany(limit, page),
  //     fetcher
  //   );

  //   return {
  //     products: data?.data || [],
  //     isLoading: !data && !error,
  //     isError: error,
  //   };
  // };

  // const useProduct = (id: string) => {
  //   const { data, error } = useSWR<Product>(
  //     routes.v1.products.fineOne(id),
  //     fetcher
  //   );

  //   return {
  //     product: data || null,
  //     isLoading: !data && !error,
  //     isError: error,
  //   };
  // };

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
}

export default ProductsApi;
