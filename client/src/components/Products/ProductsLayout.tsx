'use client';
import ProductCard from './ProductCard/ProductCard';

import Filter from './Filter/Filter';
import { Product } from '@/api/types/types';
import useUrl from '@/hooks/useUrl';
import FloatingActionButton from './Filter/mobile/FloatingActionButton';
import { useState } from 'react';
import FilterModal from './Filter/mobile/FilterModal';
import { EmptyProducts } from './EmptyProducts';
import BreadcrumbNav, { BreadcrumbItem } from '../common/BreadcrumbNav';
import { usePathname } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import ProductsPagination from './Pagination/Pagination';

type ProductsLayoutProps = {
  products: Product[];
  title: string;
  totalPages: number;
  page: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
  breadcrumbItems: BreadcrumbItem[];
};

export default function ProductsLayout({
  products,
  title,
  totalPages,
  page,
  onPageChange,
  totalProducts,
  breadcrumbItems = [{ label: 'Προϊόντα', href: '/products' }],
}: ProductsLayoutProps) {
  const t = useTranslations('common');
  const pathname = usePathname();
  const { filter } = useUrl(pathname);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const emptyFilters = !filter || Object.keys(filter).length === 0;

  const params = useParams<{ categorySlug?: string }>();

  // Check if we're in a category page by examining the URL path and breadcrumb items
  const categorySlug = params.categorySlug ?? null;

  if (!products.length && emptyFilters) {
    return <EmptyProducts />;
  }

  const handleOpenFilters = () => {
    setIsMobileFilterOpen(true);
  };

  return (
    <main className="flex-grow bg-background p-6">
      <div className="min-h-[64px]" />
      <div className="container mx-auto px-4 pb-20">
        <div className="mb-16">
          <BreadcrumbNav items={breadcrumbItems} />

          <h1 className="text-2xl font-bold text-black mb-2">{title}</h1>

          <p className="text-base mb-4">
            {t('TOTAL_PRODUCTS', { count: totalProducts })}
          </p>
        </div>

        <div className="flex flex-wrap justify-center -mx-4">
          {/* <Hidden xsDown> */}
          <div className="hidden md:block w-full md:w-1/4 px-4">
            <Filter />
          </div>
          {/* Mobile Filter - START */}
          <FloatingActionButton handleOpenFilters={handleOpenFilters} />
          <FilterModal
            open={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
          />
          {/* Mobile Filter - END */}

          <div className="w-full md:w-3/4 px-4">
            <div className="flex flex-wrap -mx-4">
              {products.map((product) => (
                <div className="w-full sm:w-1/2 lg:w-1/3 p-4" key={product.id}>
                  <div className="h-full">
                    <ProductCard
                      product={product}
                      fromCategory={categorySlug}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Pagination */}

        <ProductsPagination
          page={page}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
}
