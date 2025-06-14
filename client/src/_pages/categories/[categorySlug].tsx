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
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Category as CategoryDto } from '@/api/types/categories';

interface CategoryProps {
  category: CategoryDto;
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
  console.log('categorySlug:', categorySlug);
  const category = await api.categories.findCategoryBySlug(categorySlug);
  console.log('Found category:', category);

  if (!category) {
    return {
      notFound: true,
    };
  }

  const products = await api.products.findMany({
    filter: {
      categorySlug,
      ...filter,
    },
    range: [start, end],
  });
  return {
    props: {
      products,
      category,
      ...(await serverSideTranslations(context.locale!, ['navbar', 'footer'])),
    },
  };
};

const Category = ({ products, category }: CategoryProps) => {
  // console.log('Product params', params);
  const router = useRouter();
  // const { categorySlug } = router.query;

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
  // console.log({ categorySlug });
  // If the category does not exist, redirect to the home page
  // if (!category) {
  //   router.push('/');
  //   return null;
  // }
  // if (typeof categorySlug !== 'string') return <div>Category not found</div>;

  // return productsStatus === 'loading' ? (
  //   <Spinner />
  // ) : (
  return (
    <ProductsLayout
      title={category.name}
      products={products.data}
      totalPages={totalPages}
      page={page}
      onPageChange={onPageChange}
      totalProducts={products.count}
      breadcrumbItems={[
        { label: 'Κατηγορίες', href: '/categories' },
        { label: category.slug },
      ]}
    />
  );
  // );
};

export default Category;
