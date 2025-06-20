'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '../../ui/button';
import { api } from '@/api';
import { useCart } from '@/hooks/useCart';
import { useTranslations } from 'next-intl';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/context/ToastProvider';

type Props = {
  productId: string;
};

const AddToCartProductButton = ({ productId }: Props) => {
  const t = useTranslations('common');

  const { setCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = async () => {
    try {
      const cart = await api.cart.addToCart(productId, 1);
      setCart(cart);

      // Show success toast notification
      addToast({
        title: t('ADD_TO_CART_SUCCESS'),
        type: 'success',
        duration: 3000,
      });
    } catch (error) {
      // Show error toast notification
      addToast({
        title: t('ADD_TO_CART_ERROR'),
        description: error instanceof Error ? error.message : String(error),
        type: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-primary/20 hover:bg-primary/30 cursor-pointer"
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
