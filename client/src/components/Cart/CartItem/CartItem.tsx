import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import { removeFromCart, updateCart } from '../../../redux/slices/cart';
import { useAppDispatch } from '../../../redux/store';

import useStyles from './styles';

type CartItemProps = {
  item: any;
};

const CartItem = ({ item }: CartItemProps) => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const handleRemoveFromCart = async (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const onUpdateCartQty = async (productId: string, quantity: number) => {
    dispatch(updateCart({ productId, quantity }));
  };

  return (
    <Card sx={{ pt: 5 }}>
      <CardMedia
        image={item.media.source}
        className={classes.media}
        sx={{
          objectFit: 'contain',
          width: 200,
          height: 200,
          mx: 'auto',
        }}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>
            +
          </Button>
        </div>
        <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
