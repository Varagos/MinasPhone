import { Container, Typography, Button, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem';

import useStyles from './styles';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <div style={{ minHeight: '60vh' }}>
      <Typography variant="h6">Δεν υπάρχει τίποτα στο καλάθι σου.</Typography>
      <Typography variant="subtitle1">
        Κάποιος πρέπει να ψωνίσει αυτά τα υπέροχα προϊόντα!
        <br />
        <Link to="/" className={classes.link}>
          {' '}
          Ανακάλυψε τα!
        </Link>
      </Typography>
    </div>
  );

  const FilledCart = () => (
    <Box mb={6}>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            component={Link}
            to="/checkout"
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </Box>
  );

  console.log(cart.line_items);
  if (!cart.line_items) return <div>"Loading..."</div>;

  return (
    <Container sx={{ py: 2 }}>
      {/* <div className={classes.toolbar} /> */}
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
