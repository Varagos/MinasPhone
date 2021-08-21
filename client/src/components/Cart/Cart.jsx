import { Container, Typography, Button, Grid, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";

import useStyles from "./styles";

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCard, handleEmptyCart }) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant='subtitle1'>
      You have no items in your shopping cart,
      <Link to='/' className={classes.link}>
        {" "}
        start adding some!
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <Box mb={6}>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCard}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant='h4'>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size='large'
            type='button'
            variant='contained'
            color='secondary'
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            component={Link}
            to='/checkout'
            className={classes.checkoutButton}
            size='large'
            type='button'
            variant='contained'
            color='primary'
          >
            Checkout
          </Button>
        </div>
      </div>
    </Box>
  );

  console.log(cart.line_items);
  if (!cart.line_items) return "Loading...";

  return (
    <Container>
      {/* <div className={classes.toolbar} /> */}
      <Typography className={classes.title} variant='h3' gutterBottom>
        Your shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
