'use client';

import { api } from '@/api';
import { useCart } from '@/hooks/useCart';
import Button from '@mui/material/Button';
import React from 'react';

const AddToCartButton = ({
  productId,
  content,
}: {
  productId: string;
  content: string;
}) => {
  const { setCart } = useCart();

  const handleAddToCart = async (id: string) => {
    const cart = await api.cart.addToCart(id, 1);
    setCart(cart);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      sx={{ py: 2, px: 10, textTransform: 'none' }}
      onClick={() => handleAddToCart(productId)}
    >
      {content}
    </Button>
  );
};

export default AddToCartButton;
