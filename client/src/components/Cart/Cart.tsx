import { Container, Typography, Button, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { emptyCart, removeFromCart } from '../../redux/slices/cart';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import CartItem from './CartItem/CartItem';
import useStyles from './styles';

const Cart = () => {
  const classes = useStyles();

  const cart = useAppSelector((state) => state.cart.data);
  const dispatch = useAppDispatch();

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
            <CartItem item={item} />
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
            variant="outlined"
            color="primary"
            onClick={handleEmptyCart}
            sx={{ textTransform: 'none' }}
          >
            Άδειασε το καλάθι
          </Button>
          <Button
            component={Link}
            to="/checkout"
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            sx={{ ml: 5, textTransform: 'none' }}
          >
            Ολοκλήρωση παραγγελίας
          </Button>
        </div>
      </div>
    </Box>
  );

  // console.log(cart.line_items);
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
