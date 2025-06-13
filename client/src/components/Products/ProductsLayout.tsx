import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import ProductCard from './ProductCard/ProductCard';
import { MainContainer, ToolBar } from './styles';
import EmptyLogo from '../../../public/undraw_empty_xct9.svg';
import Filter from './Filter/Filter';
import { Product } from '@/api/types/types';
import useUrl from '@/hooks/useUrl';
import { useRouter } from 'next/router';
import FloatingActionButton from './Filter/mobile/FloatingActionButton';
import { useState } from 'react';
import FilterModal from './Filter/mobile/FilterModal';
import { EmptyProducts } from './EmptyProducts';
import BreadcrumbNav, { BreadcrumbItem } from '../common/BreadcrumbNav';

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
  const router = useRouter();
  const { asPath } = router;
  const { filter } = useUrl(asPath);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const emptyFilters = !filter || Object.keys(filter).length === 0;

  // Check if we're in a category page by examining the URL path and breadcrumb items
  const categorySlug =
    router.pathname === '/categories/[categorySlug]'
      ? (router.query.categorySlug as string)
      : null;

  console.log('ProductsLayout fromCategory', categorySlug);

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
            Βρέθηκαν {totalProducts} προϊόντα
          </Typography>
        </Box>

        <Grid container justifyContent="center" spacing={4}>
          {/* <Hidden xsDown> */}
          <Grid
            item
            xs={0}
            sm={3}
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

          <Grid item container xs={12} sm={9} spacing={4}>
            {products.map((product) => (
              <Grid
                item
                key={product.id}
                xs={12}
                md={6}
                lg={4}
                // sx={{ borderColor: 'red', borderWidth: 1, borderStyle: 'solid' }}
              >
                <ProductCard product={product} fromCategory={categorySlug} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* Pagination */}
        <Grid container justifyContent="flex-end">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, newPage) => onPageChange(newPage)}
            sx={{ pt: 2 }} // Add some padding-top for spacing
          />
        </Grid>
      </Container>
    </MainContainer>
  );
}
