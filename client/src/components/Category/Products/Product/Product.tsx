import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import StoreMallDirectoryTwoToneIcon from '@mui/icons-material/StoreMallDirectoryTwoTone';
import { Product as ProductType } from '@chec/commerce.js/types/product';
import { productSelected } from '../../../../redux/productSlice';
import { addToCart } from '../../../../redux/cartSlice';

const Product = () => {
  const dispatch = useAppDispatch();
  const params = useParams<any>();
  console.log('Product params', params);
  const { product_id: productId } = params;
  console.log(productId);
  const allProducts = useAppSelector((state) => state.products);
  const product = useAppSelector((state) => state.product.data);

  useEffect(() => {
    const product = allProducts.data.find((product) => product.id === productId);
    if (!product) return;
    dispatch(productSelected(product));
  }, []);

  const handleAddToCart = (id: string) => {
    dispatch(addToCart({ productId: id, quantity: 1 }));
  };

  if (!product) return <div style={{ minHeight: '70vh' }}>Error finding product</div>;

  return (
    <Container maxWidth="lg" sx={{ pt: 10, pb: 20, bgcolor: 'background.paper' }}>
      <Grid container spacing={2}>
        <Grid container item xs={12} sm={6} sx={{ pt: 13 }} justifyContent="center">
          <Box
            component="img"
            sx={{
              objectFit: 'cover',
              width: '60%',
              height: 'auto',
              py: 5,

              // height: 233,
              // width: 350,
              // maxHeight: { xs: 233, md: 167 },
              // maxWidth: { xs: 350, md: 250 },
            }}
            alt={product.name}
            src={product.media.source}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box mr={4}>
              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>
            </Box>

            <Box ml={4}>
              <Typography style={{ marginRight: 'auto', color: '#69b67c' }} variant="h6">
                {product.price.formatted_with_symbol}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', my: 8 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StoreMallDirectoryTwoToneIcon />
              <Typography variant="caption">Παραλαβή από το κατάστημα.</Typography>
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
};

export default Product;
