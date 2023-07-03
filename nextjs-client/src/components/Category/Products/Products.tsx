import { Box, Container, Grid, Typography } from '@mui/material';

import ProductCard from './ProductCard/ProductCard';
import useStyles from './styles';
import EmptyLogo from '../../../../public/undraw_empty_xct9.svg';
import Filter from '../Filter/Filter';

type ProductsType = {
  products: any[];
};

function Products({ products }: ProductsType) {
  const classes = useStyles();

  if (!products.length) {
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
        <img src={EmptyLogo} style={{ width: '50%', height: 'auto' }} />
      </main>
    );
  }

  return (
    <main className={classes.content} style={{ minHeight: '80vh' }}>
      <div className={classes.toolbar} />
      <Container sx={{ pb: 20 }}>
        <Grid container justifyContent="center" spacing={4}>
          {/* <Hidden xsDown> */}
          <Grid
            item
            xs={0}
            sm={3}
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
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
  );
}

export default Products;
