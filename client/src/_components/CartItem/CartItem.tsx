import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import Link from 'next/link';
import { api } from '@/api';
import { CartLineItem } from '@/api/types/cart';
import { formatPriceWithSymbol } from '@/utils/prices';
import { useCart } from '@/hooks/useCart';
import { useTheme } from '@mui/material/styles';

type CartItemWrapperProps = {
  item: CartLineItem;
};

type CartItemProps = {
  item: CartLineItem;
  handleRemoveFromCart: (lineItemId: string) => void;
  onUpdateCartQty: (lineItemId: string, quantity: number) => Promise<void>;
};

const CartItem = ({ item }: CartItemWrapperProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { setCart } = useCart();

  const handleRemoveFromCart = async (lineItemId: string) => {
    const cart = await api.cart.removeFromCart(lineItemId);
    setCart(cart);
  };

  const onUpdateCartQty = async (lineItemId: string, quantity: number) => {
    if (quantity === 0) {
      return handleRemoveFromCart(lineItemId);
    }
    const cart = await api.cart.updateLineItem(lineItemId, quantity);
    setCart(cart);
  };

  return (
    <div>
      {isMobile ? (
        <MobileCartItem
          item={item}
          handleRemoveFromCart={handleRemoveFromCart}
          onUpdateCartQty={onUpdateCartQty}
        />
      ) : (
        <DesktopCartItem
          item={item}
          handleRemoveFromCart={handleRemoveFromCart}
          onUpdateCartQty={onUpdateCartQty}
        />
      )}
    </div>
  );
};

const MobileCartItem = ({
  item,
  handleRemoveFromCart,
  onUpdateCartQty,
}: CartItemProps) => {
  return (
    <Card sx={{ margin: 'auto' }}>
      <Grid container>
        <Grid size={4}>
          <CardMedia
            component="img"
            image={item.productImage}
            alt={item.productName}
            sx={{ width: '100%', height: 'auto', p: 2 }}
          />
        </Grid>
        <Grid size={8}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.productName}
            </Typography>
            <Link href={`/products/${item.productId}`} passHref>
              <Typography variant="body2" color="text.secondary">
                Λεπτομέρειες
              </Typography>
            </Link>
          </CardContent>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          size={6}>
          <IconButton
            onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
          >
            <RemoveIcon />
          </IconButton>
          <Typography sx={{ marginX: 2 }}>{item.quantity}</Typography>
          <IconButton
            onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
          >
            <AddIcon />
          </IconButton>
        </Grid>
        <Grid sx={{ textAlign: 'center' }} size={6}>
          <Typography variant="h6">
            {formatPriceWithSymbol(item.quantity * item.productPrice)}
          </Typography>
          <IconButton
            aria-label="remove item"
            sx={{ color: 'error.main' }}
            onClick={() => handleRemoveFromCart(item.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
};

const DesktopCartItem = ({
  item,
  handleRemoveFromCart,
  onUpdateCartQty,
}: CartItemProps) => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 151, padding: 3 }}
        image={item.productImage}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {item.productName}
          </Typography>
          <Link
            href={`/products/${item.productId}`}
            style={{ textDecoration: 'none' }}
            passHref
          >
            <Typography variant="subtitle1" color="text.secondary">
              Λεπτομέρειες
            </Typography>
          </Link>
        </CardContent>
      </Box>

      <CardActions
        sx={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            aria-label="remove item"
            onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
          >
            <RemoveIcon />
          </IconButton>
          <Typography sx={{ mg: 2, px: 2 }}>{item.quantity}</Typography>

          <IconButton
            aria-label="remove item"
            onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
          >
            <AddIcon />
          </IconButton>
        </div>
      </CardActions>
      <Box
        sx={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          // border: 'solid 1px',
        }}
      >
        <Typography variant="h5" align="center">
          {formatPriceWithSymbol(item.quantity * item.productPrice)}
        </Typography>

        <IconButton
          size="medium"
          aria-label="remove item"
          sx={(theme) => ({ color: theme.palette.error.main })}
          onClick={() => handleRemoveFromCart(item.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default CartItem;
