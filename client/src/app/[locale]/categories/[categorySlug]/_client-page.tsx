'use client';
import React, { useState } from 'react';
import ProductsLayout from '@/components/Products/ProductsLayout';
import { ProductPaginatedResponse } from '@/api/types/products';
import useUrl from '@/hooks/useUrl';
import { parseUrlRange } from '@/utils/pagination';
import { Category as CategoryDto } from '@/api/types/categories';
import { usePathname } from 'next/navigation';

interface CategoryProps {
  category: CategoryDto;
  products: ProductPaginatedResponse;
}

export default function CategoryClientPage({
  category,
  products,
}: CategoryProps) {
  // console.log('Product params', params);

  const url = usePathname();
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
}
