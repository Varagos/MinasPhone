'use client';
import React from 'react';
import ProductCard from '@/components/Products/ProductCard/ProductCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import { ThickBottomBorder } from '../styles';
import { useTranslations } from 'next-intl';
import { Product } from '@/api/types/products';

const SuggestedProducts = ({
  shuffledProducts,
}: {
  shuffledProducts: Product[];
}) => {
  const t = useTranslations('landing');
  return (
    <section>
      <Container>
        <Box my={8} alignItems={'center'}>
          <Typography
            component="h3" // Semantic HTML
            variant="h4" // Visual style
            align="center"
            gutterBottom
            fontWeight={900}
          >
            <ThickBottomBorder>
              {t('SUGGESTED_PRODUCTS.TITLE')}
            </ThickBottomBorder>
          </Typography>
        </Box>

        <Grid
          container
          justifyContent="center"
          spacing={2}
          alignItems="stretch"
        >
          {shuffledProducts.length > 3 &&
            shuffledProducts.slice(0, 4).map((product) => (
              <Grid
                key={product.id}
                size={{
                  xs: 8,
                  sm: 6,
                  md: 4,
                  lg: 3,
                }}
              >
                <ProductCard product={product} fromCategory={null} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </section>
  );
};

export default SuggestedProducts;
