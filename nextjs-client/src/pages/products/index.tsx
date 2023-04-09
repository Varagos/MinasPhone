import Head from 'next/head';
import { useEffect } from 'react';
import { Container, Grid } from '@mui/material';

import useStyles from '@/components/Category/Products/styles';
import ProductCard from '@/components/Category/Products/ProductCard/ProductCard';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchProducts } from '@/redux/slices/products';
import Spinner from '@/components/Spinner/Spinner';
import Filter from '@/components/Category/Filter/Filter';

export default function Landing() {
  const classes = useStyles();

  const products = useAppSelector((state) => state.products.data);
  const productsStatus = useAppSelector((state) => state.products.status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {productsStatus === 'loading' ? (
          <Spinner />
        ) : (
          <main className={classes.content} style={{ minHeight: '80vh' }}>
            <div className={classes.toolbar} />
            <Container sx={{ pb: 20 }}>
              <Grid container justifyContent="center" spacing={4}>
                {/* <Hidden xsDown> */}
                <Grid item xs={0} sm={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Filter />
                </Grid>
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
            </Container>
          </main>
        )}
      </main>
    </>
  );
}