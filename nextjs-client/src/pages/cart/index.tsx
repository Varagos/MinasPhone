import { useEffect } from 'react';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
import Link from 'next/link';
import { emptyCart, fetchCart } from '@/redux/slices/cart';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import useStyles from './_styles';
import LinkButton from '@/components/custom-components/LinkButton';
import Spinner from '@/components/Spinner/Spinner';
import CartItem from '@/components/CartItem/CartItem';

const Cart = () => {
  const classes = useStyles();

  const cart = useAppSelector((state) => state.cart.data);
  // TODO Make sure Use cannot proceed to checkout if cart is status is pending
  const status = useAppSelector((state) => state.cart.status);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);
  const handleEmptyCart = async () => {
    dispatch(emptyCart());
  };

  if (!cart) return <div>"Loading..."</div>;

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
        {status === 'loading' ? (
          <Spinner />
        ) : (
          cart.line_items.map((item) => (
            <Grid item sm={12} key={item.id}>
              <CartItem item={item} />
            </Grid>
          ))
        )}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Σύνολο: {cart.subtotal.formatted_with_symbol}
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
            disabled={status !== 'success'}
            sx={{ ml: 5, textTransform: 'none' }}
          >
            Ολοκλήρωση παραγγελίας
          </LinkButton>
        </div>
      </div>
    </Box>
  );

  // console.log(cart.line_items);
  if (!cart.line_items) return <div>"Loading..."</div>;

  return (
    <Container sx={{ pt: 2, pb: 20 }}>
      {/* <div className={classes.toolbar} /> */}
      <Typography className={classes.title} variant="h3" gutterBottom>
        Καλάθι Αγορών
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;