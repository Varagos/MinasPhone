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
import {
  cartItemRemoved,
  cartUpdated,
  removeFromCart,
  updateCart,
} from '@/redux/slices/cart';
import { useAppDispatch } from '@/redux/store';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import useStyles from './styles';
import Link from 'next/link';
import { LineItem } from '@/types/line-item';
// import { LineItem } from '@/services/cart';

type CartItemProps = {
  item: LineItem;
};

const CartItem = ({ item }: CartItemProps) => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const handleRemoveFromCart = async (lineItemId: string) => {
    dispatch(cartItemRemoved({ lineItemId }));
    dispatch(removeFromCart(lineItemId));
  };

  const onUpdateCartQty = async (lineItemId: string, quantity: number) => {
    dispatch(cartUpdated({ lineItemId, quantity }));
    dispatch(updateCart({ lineItemId, quantity }));
  };

  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 151, padding: 3 }}
        image={item.media.source}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 3 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {item.name}
          </Typography>
          <Link
            href={`/products/${item.product_id}`}
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
          {item.line_total.formatted_with_symbol}
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
