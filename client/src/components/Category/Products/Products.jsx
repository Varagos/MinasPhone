import { Box, Grid, Hidden, Paper, Typography } from "@material-ui/core";

import Product from "./Product/Product";
import useStyles from "./styles";
import EmptyLogo from "../../../assets/undraw_empty_xct9.svg";
import Filter from "../Filter/Filter";

function Products({ products, onAddToCart }) {
  const classes = useStyles();

  if (!products.length) {
    return (
      <main>
        <Box ml={4} py={6}>
          <Typography variant='h5' style={{ display: "inline-block", verticalAlign: "top" }}>
            Η κατηγορία είναι άδεια!
          </Typography>
          <Typography>Δοκιμάστε να επιλέξετε κάποια εναλλακτική.</Typography>
        </Box>
        <img src={EmptyLogo} style={{ width: "50%", height: "auto" }} />
      </main>
    );
  }

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent='center' spacing={4}>
        <Hidden xsDown>
          <Grid item xs={0} sm={3}>
            <Filter />
          </Grid>
        </Hidden>
        <Grid item container xs={12} sm={9} spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} onAddToCart={onAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </main>
  );
}

export default Products;
