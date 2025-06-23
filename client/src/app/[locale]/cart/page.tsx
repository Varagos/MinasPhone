'use client';
import Spinner from '@/components/Spinner/Spinner';
import CartItem from '@/components/CartItem/CartItem';
import { api } from '@/api';
import type { Cart } from '@/api/types/cart';
import { formatPriceWithSymbol } from '@/utils/prices';
import { useCart } from '@/hooks/useCart';
import { useTranslations } from 'use-intl';
import { Button } from '@/components/ui/button';
import { Link as NavigationLink } from '@/i18n/navigation';

type CartPageProps = {
  cart: Cart;
  handleEmptyCart: () => void;
};

const FilledCart = ({ cart, handleEmptyCart }: CartPageProps) => {
  const t = useTranslations('orders');

  return (
    <div className="container mx-auto mb-24">
      <div className="grid grid-cols-1 gap-6">
        {cart.lineItems.map((item) => (
          <div key={item.id} className="w-full">
            <CartItem item={item} />
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mt-[10%] gap-4">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-center md:text-left">
            {t('TOTAL')}: {formatPriceWithSymbol(cart.subtotal)}
          </h2>
        </div>

        <div className="w-full md:w-1/2 flex flex-col md:flex-row md:justify-end gap-4 px-4 md:px-0">
          <Button
            variant="outline"
            size="lg"
            onClick={handleEmptyCart}
            className="w-full md:w-auto md:min-w-[150px] normal-case mx-2 md:mx-0 cursor-pointer"
          >
            {t('EMPTY_CART')}
          </Button>

          <Button
            variant="default"
            size="lg"
            disabled={cart === null || cart.lineItems.length === 0}
            className="w-full md:w-auto md:min-w-[150px] normal-case mx-2 md:mx-0"
            asChild
          >
            <NavigationLink href="/checkout">{t('CHECKOUT')}</NavigationLink>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function CartPage() {
  // Fix
  const { cart, setCart } = useCart();
  const t = useTranslations('orders');

  // const cart = await api.cart.retrieveCart();

  const handleEmptyCart = async () => {
    const cart = await api.cart.clearCart();
    // TODO fix how we update navbar cart quantity
    setCart(cart);
  };

  if (cart === null) return <Spinner />;

  const EmptyCart = () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h2 className="text-xl font-medium mb-2">{t('NO_PRODUCTS_IN_CART')}</h2>
      <p className="text-base text-muted-foreground mb-4">
        {t('NO_PRODUCTS_IN_CART_SUBTITLE')}
      </p>
      <Button variant="link" asChild className="p-0">
        <NavigationLink href="/">{t('DISCOVER')}</NavigationLink>
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto pt-8 pb-24">
      <h1 className="text-3xl font-bold mt-[5%] mb-8">{t('CART_TITLE')}</h1>

      {!cart.lineItems.length ? (
        <EmptyCart />
      ) : (
        <FilledCart cart={cart} handleEmptyCart={handleEmptyCart} />
      )}
    </div>
  );
}
