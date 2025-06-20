'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/hooks/useCart';
import { api } from '@/api';

type Props = {
  productId: string;
};

const AddToCartProductButton = ({ productId }: Props) => {
  const t = useTranslations('common');

  const { setCart } = useCart();

  const handleAddToCart = async () => {
    const cart = await api.cart.addToCart(productId, 1);
    setCart(cart);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-primary/20 hover:bg-primary/30"
            onClick={handleAddToCart}
            aria-label="Add to Cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('ADD_TO_CART')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AddToCartProductButton;
