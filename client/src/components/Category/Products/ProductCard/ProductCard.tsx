import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, CardActionArea, Box } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

import useStyles from './styles';
import { Link } from 'react-router-dom';
import { Product as ProductType } from '@chec/commerce.js/types/product';
import { useAppDispatch } from '../../../../redux/store';
import { addToCart } from '../../../../redux/cartSlice';
import { useState } from 'react';

type ProductProps = {
  product: ProductType;
};

function ProductCard({ product }: ProductProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [raised, setRaised] = useState<boolean>(false);

  const handleAddToCart = (id: string, quantity = 1) => {
    dispatch(addToCart({ productId: id, quantity }));
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
      <CardActionArea component={Link} to={`/products/${product.id}`} sx={{ pt: 2, px: 0 }}>
        {/* Small: Thumbnails
          These are small (100 x 100 or 200 x 200)  */}
        <CardMedia
          component="img"
          image={product.media.source}
          title={product.name}
          sx={{
            objectFit: 'contain',
            width: 200,
            height: 200,
            mx: 'auto',
          }}
        />
      </CardActionArea>
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
          <Typography
            display="block"
            color="textSecondary"
            variant="body1"
            gutterBottom
            // noWrap
            component={Link}
            to={`/products/${product.id}`}
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
          <CardActions disableSpacing className={classes.cardActions}>
            <Typography style={{ marginRight: 'auto', color: '#69b67c' }} variant="h6">
              {product.price.formatted_with_symbol}
            </Typography>
            <IconButton aria-label="Add to Card" onClick={() => handleAddToCart(product.id, 1)}>
              <AddShoppingCart />
            </IconButton>
          </CardActions>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
