'use client';

import { api } from '@/api';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
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
      variant="default"
      size="lg"
      className="py-6 px-10 text-base font-normal"
      onClick={() => handleAddToCart(productId)}
    >
      {content}
    </Button>
  );
};

export default AddToCartButton;
