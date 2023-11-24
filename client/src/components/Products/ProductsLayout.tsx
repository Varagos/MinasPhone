import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

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

type ProductsLayoutProps = {
  products: Product[];
  totalPages: number;
  page: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
};

function EmptyProducts() {
  return (
    <main>
      <Box ml={4} py={6}>
        <Typography
          variant="h5"
          style={{ display: 'inline-block', verticalAlign: 'top' }}
        >
          Η κατηγορία είναι άδεια!
        </Typography>
        <Typography>Δοκιμάστε να επιλέξετε κάποια εναλλακτική.</Typography>
      </Box>
      <Image
        src={EmptyLogo}
        style={{ width: '50%', height: 'auto' }}
        alt="Empty products"
      />
    </main>
  );
}

export default function ProductsLayout({
  products,
  totalPages,
  page,
  onPageChange,
  totalProducts,
}: ProductsLayoutProps) {
  const { asPath } = useRouter();
  const { filter } = useUrl(asPath);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const emptyFilters = !filter || Object.keys(filter).length === 0;
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
        <Grid container justifyContent="center" spacing={4}>
          {/* Title etc */}
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom color="black">
              <strong>Προϊόντα</strong>
            </Typography>
            {/* Total products */}
            <Typography variant="body1" gutterBottom>
              Βρέθηκαν {totalProducts} προϊόντα
            </Typography>
          </Grid>
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
                <ProductCard product={product} />
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
