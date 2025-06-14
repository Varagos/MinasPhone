import React, { useEffect, useState } from 'react';
import ProductsLayout from '@/components/Products/ProductsLayout';
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
import CategoryClientPage from './_client-page';

interface CategoryProps {
  category: CategoryDto;
  products: ProductPaginatedResponse;
}

type CategoryPageProps = {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// export default async function ProductPage({
//   params,
//   searchParams,
// }: {
//   params: Promise<{ productId: string }>;
// }) {

export default async function Category({
  params,
  searchParams,
}: CategoryPageProps) {
  const { range, filter } = await searchParams;
  const categorySlug = (await params).categorySlug;

  const [start, end] = parseRangeFromQuery(range);
  const parsedFilter = parseFilterFromQuery(filter);
  console.log('filter:', filter);

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
      ...parsedFilter,
    },
    range: [start, end],
  });

  return <CategoryClientPage category={category} products={products} />;
}
