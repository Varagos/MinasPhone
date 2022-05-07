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
      }}
    >
      <CardActionArea component={Link} to={`/products/${product.id}`}>
        <CardMedia component="img" className={classes.media} image={product.media.source} title={product.name} />
      </CardActionArea>
      <CardContent>
        <div className={classes.cardContent}>
          <Typography display="inline" color="textSecondary" variant="h6" gutterBottom>
            {product.name}
          </Typography>
          {/* <Typography
            dangerouslySetInnerHTML={{ __html: product.description }}
            variant='body2'
            color='textSecondary'
          /> */}
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
