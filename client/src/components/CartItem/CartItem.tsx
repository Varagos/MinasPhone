'use client';

import Image from 'next/image';
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { api } from '@/api';
import { CartLineItem } from '@/api/types/cart';
import { formatPriceWithSymbol } from '@/utils/prices';
import { useCart } from '@/hooks/useCart';
import { Link as NavigationLink } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

type CartItemWrapperProps = {
  item: CartLineItem;
};

type CartItemProps = {
  item: CartLineItem;
  handleRemoveFromCart: (lineItemId: string) => void;
  onUpdateCartQty: (lineItemId: string, quantity: number) => Promise<void>;
};

const CartItem = ({ item }: CartItemWrapperProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const { setCart } = useCart();

  // Handle responsive detection with useEffect instead of MUI's useMediaQuery
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is standard md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleRemoveFromCart = async (lineItemId: string) => {
    const cart = await api.cart.removeFromCart(lineItemId);
    setCart(cart);
  };

  const onUpdateCartQty = async (lineItemId: string, quantity: number) => {
    if (quantity === 0) {
      return handleRemoveFromCart(lineItemId);
    }
    const cart = await api.cart.updateLineItem(lineItemId, quantity);
    setCart(cart);
  };

  return (
    <div>
      {isMobile ? (
        <MobileCartItem
          item={item}
          handleRemoveFromCart={handleRemoveFromCart}
          onUpdateCartQty={onUpdateCartQty}
        />
      ) : (
        <DesktopCartItem
          item={item}
          handleRemoveFromCart={handleRemoveFromCart}
          onUpdateCartQty={onUpdateCartQty}
        />
      )}
    </div>
  );
};

const MobileCartItem = ({
  item,
  handleRemoveFromCart,
  onUpdateCartQty,
}: CartItemProps) => {
  const t = useTranslations('common');
  return (
    <div className="w-full bg-white rounded-lg shadow overflow-hidden border border-gray-200">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-4 p-2">
          <div className="relative w-full aspect-square">
            <Image
              src={item.productImage}
              alt={item.productName}
              className="object-contain"
              fill
            />
          </div>
        </div>
        <div className="col-span-8 p-4">
          <h3 className="text-lg font-medium mb-1">{item.productName}</h3>
          <Button
            variant="link"
            className="p-0 h-auto text-muted-foreground"
            asChild
          >
            <NavigationLink href={`/products/${item.productId}`}>
              {t('DETAILS')}
            </NavigationLink>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t">
        <div className="flex items-center justify-center p-3 gap-3 px-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 mx-2 cursor-pointer"
            onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>

          <span className="mx-2 text-base">{item.quantity}</span>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 mx-2 cursor-pointer"
            onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center p-3">
          <p className="font-semibold mb-1">
            {formatPriceWithSymbol(item.quantity * item.productPrice)}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
            onClick={() => handleRemoveFromCart(item.id)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const DesktopCartItem = ({
  item,
  handleRemoveFromCart,
  onUpdateCartQty,
}: CartItemProps) => {
  const t = useTranslations('common');
  return (
    <div className="flex w-full bg-white rounded-lg shadow overflow-hidden border border-gray-200">
      <div className="relative w-[151px] h-[151px] p-3">
        <Image
          src={item.productImage}
          alt={item.productName}
          className="object-contain"
          fill
        />
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-xl font-medium">{item.productName}</h3>
        <Button
          variant="link"
          className="p-0 h-auto justify-start text-muted-foreground cursor-pointer"
          asChild
        >
          <NavigationLink href={`/products/${item.productId}`}>
            {t('DETAILS')}
          </NavigationLink>
        </Button>
      </div>

      <div className="flex-[2] flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 cursor-pointer"
            onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
          >
            <MinusIcon className="h-5 w-5" />
          </Button>

          <span className="text-lg px-4">{item.quantity}</span>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 cursor-pointer"
            onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
          >
            <PlusIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-evenly p-4">
        <p className="text-xl font-semibold text-center">
          {formatPriceWithSymbol(item.quantity * item.productPrice)}
        </p>

        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
          onClick={() => handleRemoveFromCart(item.id)}
        >
          <TrashIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
