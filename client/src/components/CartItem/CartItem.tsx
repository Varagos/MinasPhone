import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  IconButton,
} from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import useStyles from './styles';
import Link from 'next/link';
import { api } from '@/api';
import { CartLineItem } from '@/api/types/cart';
import { formatPriceWithSymbol } from '@/utils/prices';
import { useCart } from '@/hooks/useCart';

type CartItemProps = {
  item: CartLineItem;
};

const CartItem = ({ item }: CartItemProps) => {
  const classes = useStyles();

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
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 151, padding: 3 }}
        image={item.productImage}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 3 }}>
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

      <CardActions className={classes.cartActions} sx={{ flex: 2 }}>
        <div className={classes.buttons}>
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
        }}
      >
        <Typography variant="h5" align="center">
          {formatPriceWithSymbol(item.quantity * item.productPrice)}
        </Typography>

        <IconButton
          size="medium"
          aria-label="remove item"
          color="secondary"
          onClick={() => handleRemoveFromCart(item.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default CartItem;
