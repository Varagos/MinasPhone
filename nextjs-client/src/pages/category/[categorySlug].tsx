import React, { useEffect } from 'react';
import Products from '@/components/Category/Products/Products';
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner/Spinner';
import { ProductPaginatedResponse } from '@/api/types/products';
import { api } from '@/api';
import { GetServerSideProps } from 'next';

interface CategoryProps {
  products: ProductPaginatedResponse;
}

export const getServerSideProps: GetServerSideProps<CategoryProps> = async (
  context
) => {
  const categorySlug = context.params?.categorySlug as string;
  const products = await api.products.findManyByCategorySlug({
    limit: 10,
    page: 0,
    slug: categorySlug,
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
  return <Products products={products.data} />;
  // );
};

export default Category;
