import useSWR from 'swr';
import { routes } from './config';
import { fetcher } from './common/fetcher';
import {
  ProductRequest,
  ProductPaginatedResponse,
  Product,
} from '../types/types';

const useProductsApi = () => {
  const useProducts = ({ limit, page }: ProductRequest) => {
    const { data, error } = useSWR<ProductPaginatedResponse>(
      routes.v1.products.findMany(limit, page),
      fetcher
    );

    return {
      products: data?.data || [],
      isLoading: !data && !error,
      isError: error,
    };
  };

  const useProduct = (id: string) => {
    const { data, error } = useSWR<Product>(
      routes.v1.products.fineOne(id),
      fetcher
    );

    return {
      product: data || null,
      isLoading: !data && !error,
      isError: error,
    };
  };

  return { useProducts, useProduct };
};

export default useProductsApi;
