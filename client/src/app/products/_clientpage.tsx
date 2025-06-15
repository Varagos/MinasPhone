'use client';
import { useState } from 'react';
import { ProductPaginatedResponse } from '@/api/types/products';
import ProductsLayout from '@/components/Products/ProductsLayout';
import useUrl from '@/hooks/useUrl';
import { parseUrlRange } from '@/utils/pagination';
import { usePathname } from 'next/navigation';

interface ProductsProps {
  products: ProductPaginatedResponse;
}

export default function ProductsClientPage({ products }: ProductsProps) {
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

  return (
    <ProductsLayout
      title={'Προϊόντα'}
      products={products.data}
      totalPages={totalPages}
      page={page}
      onPageChange={onPageChange}
      totalProducts={products.count}
      breadcrumbItems={[{ label: 'Προϊόντα', href: '/products' }]}
    />
  );
}
