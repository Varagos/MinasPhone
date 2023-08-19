import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

import useStyles from './styles';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/api/types/products';
import { formatPriceWithSymbol } from '@/utils/prices';
import { api } from '@/api';
import { useCart } from '@/hooks/useCart';

type ProductProps = {
  product: Product;
};

function ProductCard({ product }: ProductProps) {
  const classes = useStyles();
  const [raised, setRaised] = useState<boolean>(false);

  const { setCart } = useCart();

  const handleAddToCart = async (id: string, quantity = 1) => {
    const cart = await api.cart.addToCart(id, quantity);
    setCart(cart);
  };

  return (
    <Card
      className={classes.root}
      raised={raised}
      onMouseOver={() => setRaised(true)}
      onMouseOut={() => setRaised(false)}
      sx={{
        borderRadius: '16px',
        p: 2,
      }}
    >
      <Link
        href={`/products/${product.id}`}
        style={{
          paddingTop: 2,
        }}
      >
        {/* Small: Thumbnails
          These are small (100 x 100 or 200 x 200)  */}
        <CardMedia
          component="img"
          image={product.imageUrl}
          title={product.name}
          sx={{
            objectFit: 'contain',
            width: 200,
            height: 200,
            mx: 'auto',
          }}
        />
      </Link>
      <CardContent
        sx={{
          px: 0,
          paddingBottom: 0,
          '&:last-child': {
            paddingBottom: 0, // IMPORTANT SHIT
          },
        }}
      >
        <div>
          <Link
            href={`/products/${product.id}`}
            passHref
            style={{ textDecoration: 'none' }}
          >
            <Typography
              display="block"
              color="textSecondary"
              variant="body1"
              gutterBottom
              // noWrap
              sx={{
                textDecoration: 'none',
                height: 50, // need fixed height to keep all cards same height
                // textOverflow: 'ellipsis',
                // overflow: 'hidden',
                width: '100%',
                // whiteSpace: 'noWrap',
                // Ellipsis on 2 lines attempt...
                display: '-webkit-box',
                boxOrient: 'vertical',
                lineClamp: 2,
                wordBreak: 'break-all',
                overflow: 'hidden',
              }}
            >
              {product.name}
            </Typography>
          </Link>
          <CardActions disableSpacing className={classes.cardActions}>
            <Typography
              style={{ marginRight: 'auto', color: '#69b67c' }}
              variant="h6"
            >
              {formatPriceWithSymbol(product.price)}
            </Typography>
            <IconButton
              aria-label="Add to Card"
              onClick={() => handleAddToCart(product.id, 1)}
            >
              <AddShoppingCart />
            </IconButton>
          </CardActions>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
