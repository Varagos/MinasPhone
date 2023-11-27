import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import LinkButton from '@/components/common/LinkButton';
import Spinner from '@/components/Spinner/Spinner';
import CartItem from '@/components/CartItem/CartItem';
import { api } from '@/api';
import type { Cart } from '@/api/types/cart';
import { formatPriceWithSymbol } from '@/utils/prices';
import { useCart } from '@/hooks/useCart';
import useTheme from '@mui/styles/useTheme';

type CartPageProps = {
  cart: Cart;
  handleEmptyCart: () => void;
};

const FilledCart = ({ cart, handleEmptyCart }: CartPageProps) => {
  const theme = useTheme<any>();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Container sx={{ mb: 6 }}>
      <Grid container spacing={3} gap={3}>
        {cart.lineItems.map((item) => (
          <Grid item xs={12} key={item.id}>
            <CartItem item={item} />
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        spacing={isMobile ? 2 : 0}
        alignItems="center"
        justifyContent="space-between"
        sx={{ marginTop: '10%' }}
      >
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" align={isMobile ? 'center' : 'left'}>
            Σύνολο: {formatPriceWithSymbol(cart.subtotal)}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ textAlign: isMobile ? 'center' : 'right' }}
        >
          <Button
            size="large"
            type="button"
            variant="outlined"
            color="primary"
            onClick={handleEmptyCart}
            sx={{
              textTransform: 'none',
              minWidth: isMobile ? '100%' : '150px', // full width on mobile
              my: isMobile ? 1 : 0,
            }}
          >
            Άδειασε το καλάθι
          </Button>
          <LinkButton
            href="/checkout"
            size="large"
            type="button"
            variant="contained"
            color="primary"
            disabled={cart === null || cart.lineItems.length === 0}
            sx={{
              textTransform: 'none',
              minWidth: isMobile ? '100%' : '150px', // full width on mobile
              mt: isMobile ? 2 : 0,
              ml: isMobile ? 0 : 5,
            }}
          >
            Ολοκλήρωση παραγγελίας
          </LinkButton>
        </Grid>
      </Grid>
    </Container>
  );
};

const CartPage = () => {
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
        <Link
          href="/"
          style={{
            textDecoration: 'none',
          }}
        >
          {' '}
          Ανακάλυψε τα!
        </Link>
      </Typography>
    </div>
  );

  return (
    <Container sx={{ pt: 2, pb: 20 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          marginTop: '5%',
        }}
      >
        Καλάθι Αγορών
      </Typography>
      {!cart.lineItems.length ? (
        <EmptyCart />
      ) : (
        <FilledCart cart={cart} handleEmptyCart={handleEmptyCart} />
      )}
    </Container>
  );
};

export default CartPage;
