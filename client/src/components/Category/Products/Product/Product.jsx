import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  CardActionArea,
  Box,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

import useStyles from "./styles";

function Product({ product, onAddToCart }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='img'
          className={classes.media}
          image={product.media.source}
          title={product.name}
        />
      </CardActionArea>
      <CardContent>
        <div className={classes.CardContent}>
          <Typography display='inline' color='textSecondary' variant='h6' gutterBottom>
            {product.name}
          </Typography>
          {/* <Typography
            dangerouslySetInnerHTML={{ __html: product.description }}
            variant='body2'
            color='textSecondary'
          /> */}
          <CardActions disableSpacing className={classes.cardActions}>
            <Typography style={{ marginRight: "auto", color: "#69b67c" }} variant='h6'>
              {product.price.formatted_with_symbol}
            </Typography>
            <IconButton aria-label='Add to Card' onClick={() => onAddToCart(product.id, 1)}>
              <AddShoppingCart />
            </IconButton>
          </CardActions>
        </div>
      </CardContent>
    </Card>
  );
}

export default Product;
