import { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
import Link from 'next/link';
import useStyles from './_styles';
import LinkButton from '@/components/custom-components/LinkButton';
import Spinner from '@/components/Spinner/Spinner';
import CartItem from '@/components/CartItem/CartItem';
import { api } from '@/api';
import type { Cart } from '@/api/types/cart';
import { formatPriceWithSymbol } from '@/utils/prices';
import { useCart } from '@/hooks/useCart';

const CartPage = () => {
  const classes = useStyles();

  const { cart, setCart } = useCart();

  const handleEmptyCart = async () => {
    const cart = await api.cart.clearCart();
    setCart(cart);
  };

  if (cart === null) return <Spinner />;

  const EmptyCart = () => (
    <div style={{ minHeight: '60vh' }}>
      <Typography variant="h6">Δεν υπάρχει τίποτα στο καλάθι σου.</Typography>
      <Typography variant="subtitle1">
        Κάποιος πρέπει να ψωνίσει αυτά τα υπέροχα προϊόντα!
        <br />
        <Link href="/" className={classes.link}>
          {' '}
          Ανακάλυψε τα!
        </Link>
      </Typography>
    </div>
  );

  const FilledCart = () => (
    <Box mb={6}>
      <Grid container spacing={3}>
        {cart === null ? (
          <Spinner />
        ) : (
          cart.lineItems.map((item) => (
            <Grid item sm={12} key={item.id}>
              <CartItem item={item} />
            </Grid>
          ))
        )}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Σύνολο: {formatPriceWithSymbol(cart.subtotal)}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="outlined"
            color="primary"
            onClick={handleEmptyCart}
            sx={{ textTransform: 'none' }}
          >
            Άδειασε το καλάθι
          </Button>
          <LinkButton
            href="/checkout"
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            disabled={cart === null || cart.lineItems.length === 0}
            sx={{ ml: 5, textTransform: 'none' }}
          >
            Ολοκλήρωση παραγγελίας
          </LinkButton>
        </div>
      </div>
    </Box>
  );

  return (
    <Container sx={{ pt: 2, pb: 20 }}>
      {/* <div className={classes.toolbar} /> */}
      <Typography className={classes.title} variant="h3" gutterBottom>
        Καλάθι Αγορών
      </Typography>
      {!cart.lineItems.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default CartPage;
