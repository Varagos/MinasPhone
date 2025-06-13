import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import Image from 'next/image';

import useStyles from './styles';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/api/types/products';
import { formatPriceWithSymbol } from '@/utils/prices';
import { api } from '@/api';
import { useCart } from '@/hooks/useCart';
import { BreadcrumbItem } from '@/components/common/BreadcrumbNav';

type ProductProps = {
  product: Product;
  // Whether the product is displayed from a category
  fromCategory: string | null;
};

function ProductCard({ product, fromCategory }: ProductProps) {
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
        href={
          fromCategory
            ? `/products/${product.id}?from=${fromCategory}`
            : `/products/${product.id}`
        }
        style={{
          paddingTop: 2,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* Small: Thumbnails
          These are small (100 x 100 or 200 x 200)  */}
          <Image
            src={product.imageUrl}
            width={200}
            height={200}
            style={{
              objectFit: 'contain',
            }}
            alt={product.name}
          />
        </div>
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
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'primary.light',
                  '& .MuiSvgIcon-root': {
                    color: 'primary.dark',
                  },
                },
              }}
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
