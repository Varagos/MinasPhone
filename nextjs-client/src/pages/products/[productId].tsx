import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import StoreMallDirectoryTwoToneIcon from '@mui/icons-material/StoreMallDirectoryTwoTone';
import Spinner from '@/components/Spinner/Spinner';
import { api } from '@/api';
import { Product, ProductPaginatedResponse } from '@/api/types/products';
import { GetServerSideProps } from 'next';
import { formatPriceWithSymbol } from '@/utils/prices';

interface ProductsPageProps {
  product: Product;
}

export const getServerSideProps: GetServerSideProps<ProductsPageProps> = async (
  context
) => {
  const productId = context.params?.productId as string;
  const product = await api.products.findOneById(productId);
  return { props: { product } };
};

export default function ProductPage({ product }: ProductsPageProps) {
  // console.log(productId);

  const handleAddToCart = (id: string) => {
    return api.cart.addToCart(id, 1);
  };

  if (!product)
    return <div style={{ minHeight: '70vh' }}>Error finding product</div>;

  return (
    <Container
      maxWidth="lg"
      sx={{ pt: 10, pb: 20, bgcolor: 'background.paper' }}
    >
      <Grid container spacing={2}>
        <Grid
          container
          item
          xs={12}
          sm={6}
          sx={{ pt: 13 }}
          justifyContent="center"
        >
          {/* Medium: Product pages
Every product needs good product page-quality images. These images (usually 640 x 640 or 800 x 800) */}
          <Box
            component="img"
            sx={{
              objectFit: 'cover',
              width: '60%',
              height: 'auto',
              py: 5,
              backgroundColor: 'white',
              pointerEvents: 'none',
              '&:hover': {
                backgroundColor: 'white',
              },
              textTransform: 'none',

              // height: 233,
              // width: 350,
              // maxHeight: { xs: 233, md: 167 },
              // maxWidth: { xs: 350, md: 250 },
            }}
            alt={product.name}
            src={product.imageUrl}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Box mr={4}>
              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>
            </Box>

            <Box ml={4}>
              <Typography
                style={{ marginRight: 'auto', color: '#69b67c' }}
                variant="h6"
                noWrap
              >
                {formatPriceWithSymbol(product.price)}
                {/* {product.price.formatted_with_symbol} */}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              my: 8,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StoreMallDirectoryTwoToneIcon />
              <Typography variant="caption">
                Παραλαβή από το κατάστημα.
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ py: 2, px: 10, textTransform: 'none' }}
              onClick={() => handleAddToCart(product.id)}
            >
              Προσθήκη στο καλάθι
            </Button>
          </Box>

          <Box sx={{ mt: 10 }}>
            <Typography variant="h6">Περιγραφή</Typography>
            <Typography
              dangerouslySetInnerHTML={{ __html: product.description }}
              variant="body2"
              color="textSecondary"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
