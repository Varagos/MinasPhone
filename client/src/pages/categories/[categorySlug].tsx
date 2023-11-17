import React, { useEffect } from 'react';
import ProductsLayout from '@/components/Products/ProductsLayout';
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner/Spinner';
import { ProductPaginatedResponse } from '@/api/types/products';
import { api } from '@/api';
import { GetServerSideProps } from 'next';
import { parseRangeFromQuery } from '@/utils/serverParsers';

interface CategoryProps {
  products: ProductPaginatedResponse;
}

export const getServerSideProps: GetServerSideProps<CategoryProps> = async (
  context
) => {
  const { query } = context;

  // Use the utility function to parse the range parameter
  const [start, end] = parseRangeFromQuery(query.range);

  const categorySlug = context.params?.categorySlug as string;
  const products = await api.products.findManyByCategorySlug({
    limit: 10,
    page: 0,
    slug: categorySlug,
    range: [start, end],
  });
  return { props: { products } };
};

const Category = ({ products }: CategoryProps) => {
  // console.log('Product params', params);
  const router = useRouter();
  const { categorySlug } = router.query;
  console.log({ products });
  console.log({ categorySlug });
  if (typeof categorySlug !== 'string') return <div>Category not found</div>;

  // return productsStatus === 'loading' ? (
  //   <Spinner />
  // ) : (
  return <ProductsLayout products={products.data} />;
  // );
};

export default Category;
