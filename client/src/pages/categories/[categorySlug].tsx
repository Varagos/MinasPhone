import React, { useEffect, useState } from 'react';
import ProductsLayout from '@/components/Products/ProductsLayout';
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner/Spinner';
import { ProductPaginatedResponse } from '@/api/types/products';
import { api } from '@/api';
import { GetServerSideProps } from 'next';
import {
  parseFilterFromQuery,
  parseRangeFromQuery,
} from '@/utils/serverParsers';
import useUrl from '@/hooks/useUrl';
import { DEFAULT_ITEMS_PER_PAGE, parseUrlRange } from '@/utils/pagination';

interface CategoryProps {
  products: ProductPaginatedResponse;
}

export const getServerSideProps: GetServerSideProps<CategoryProps> = async (
  context
) => {
  const { query } = context;

  // Use the utility function to parse the range parameter
  const [start, end] = parseRangeFromQuery(query.range);
  const filter = parseFilterFromQuery(query.filter);
  console.log('filter:', filter);

  const categorySlug = context.params?.categorySlug as string;
  const products = await api.products.findMany({
    filter: {
      categorySlug,
      ...filter,
    },
    range: [start, end],
  });
  return { props: { products } };
};

const Category = ({ products }: CategoryProps) => {
  // console.log('Product params', params);
  const router = useRouter();
  const { categorySlug } = router.query;

  const url = router.asPath;
  const { setRange, range } = useUrl(url);

  const { initialPage, itemsPerPage, totalPages } = parseUrlRange(
    range as any,
    products.count
  );
  const [page, setPage] = useState(initialPage);

  const onPageChange = (newPage: number) => {
    setPage(newPage);
    const newRange: [number, number] = [
      (newPage - 1) * itemsPerPage,
      newPage * itemsPerPage - 1,
    ]; // Adjust based on your items per page
    setRange(newRange);
  };

  console.log({ products });
  console.log({ categorySlug });
  if (typeof categorySlug !== 'string') return <div>Category not found</div>;

  // return productsStatus === 'loading' ? (
  //   <Spinner />
  // ) : (
  return (
    <ProductsLayout
      products={products.data}
      totalPages={totalPages}
      page={page}
      onPageChange={onPageChange}
      totalProducts={products.count}
    />
  );
  // );
};

export default Category;
