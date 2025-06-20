'use client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ProductCard from './ProductCard/ProductCard';
import { MainContainer, ToolBar } from './styles';
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
    <MainContainer>
      <ToolBar />
      <Container sx={{ pb: 20 }}>
        {/* Header Section with Title, Breadcrumbs, etc - Now full width above everything */}
        <Box sx={{ mb: 4 }}>
          {/* Breadcrumbs */}
          <BreadcrumbNav items={breadcrumbItems} />

          {/* Title */}
          <Typography variant="h4" gutterBottom color="black" component="h1">
            <strong>{title}</strong>
          </Typography>

          {/* Total products */}
          <Typography variant="body1" gutterBottom>
            {t('TOTAL_PRODUCTS', { count: totalProducts })}
          </Typography>
        </Box>

        <Grid container justifyContent="center" spacing={4}>
          {/* <Hidden xsDown> */}
          <Grid
            size={{
              xs: 0,
              sm: 3,
            }}
            sx={(theme) => ({
              [theme.breakpoints.down('md')]: {
                display: 'none',
              },
            })}
          >
            <Filter />
          </Grid>
          {/* Mobile Filter - START */}
          <FloatingActionButton handleOpenFilters={handleOpenFilters} />
          <FilterModal
            open={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
          />
          {/* Mobile Filter - END */}

          <Grid container size={{ xs: 12, sm: 9 }} spacing={4}>
            {products.map((product) => (
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 6,
                  lg: 4,
                }}
                key={product.id}
                // sx={{ borderColor: 'red', borderWidth: 1, borderStyle: 'solid' }}
              >
                <ProductCard product={product} fromCategory={categorySlug} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* Pagination */}

        <ProductsPagination
          page={page}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      </Container>
    </MainContainer>
  );
}
