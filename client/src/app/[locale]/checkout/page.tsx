'use client';
import React, { useState } from 'react';

import { CheckoutCapture } from '@/types/checkout-capture';
import { Button } from '@/components/ui/button';
import { Link as NavigationLink } from '@/i18n/navigation';
import Confirmation, {
  CheckoutOrderResponse,
} from './components/Confirmation/Confirmation';
import CheckoutController from './components/CheckoutController/CheckoutController';
import { useCart } from '@/hooks/useCart';
import { api } from '@/api';
import { CheckoutToken } from '@/types/checkout-token';
import { Cart } from '@/api/types/types';
import { priceNumberToFormattedPrice } from '@/utils/prices';
import { useTranslations } from 'next-intl';
import { Stepper } from '@/components/ui/stepper';

const steps = ['Λογαριασμός', 'Διέυθυνση', 'Πληρωμή'];

export type CheckoutOrderInfo = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  shippingCountry: 'GR';
  shippingSubdivision: string;
  shippingOption: string;
  receiptMethod: 'store' | 'courier';

  street: string;
  town_city: string;
  postal_zip_code: string;
};

export default function Checkout() {
  const t = useTranslations('common');
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutOrderInfo, setCheckoutOrderInfo] = useState<
    Partial<CheckoutOrderInfo>
  >({});
  const [error, setErrorMessage] = useState('');

  const [orderResponse, setOrderResponse] =
    useState<CheckoutOrderResponse | null>(null);

  const { cart, setCart } = useCart();

  const handleCaptureCheckout = async (newOrder: CheckoutCapture) => {
    try {
      const orderResult = await api.orders.checkoutOrder({
        contactInfo: {
          firstName: newOrder.customer.first_name,
          lastName: newOrder.customer.last_name,
          email: newOrder.customer.email,
          phone: `+30${newOrder.customer.phoneNumber}`,
        },
      });
      console.log('orderResult', orderResult);
      setOrderResponse({
        customer: {
          firstName: newOrder.customer.first_name,
          lastName: newOrder.customer.last_name,
        },
        orderReference: orderResult.orderId,
      });
      console.log('phoneNumber', newOrder.customer.phoneNumber);

      await api.cart.clearCart();
      // Navigate to orderId page
    } catch (error) {
      setErrorMessage(
        'There was an error capturing checkout' +
          (error as any).data.error.message
      );
    }
  };
  if (!cart) return <div>No cart</div>;

  if (!cart.lineItems) return <div>No line items</div>;

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data: Partial<CheckoutOrderInfo>) => {
    // console.log('NEXT function', data);
    setCheckoutOrderInfo((currentOrderInfo) => ({
      ...currentOrderInfo,
      ...data,
    }));
    nextStep();
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          {'Error: '}
          {error}
        </h2>
        <Button asChild variant="outline" className="mt-4">
          <NavigationLink href="/">{t('BACK_TO_HOME')}</NavigationLink>
        </Button>
      </div>
    );
  }

  const createCheckoutInfoFromCart = (
    cart: Cart | null
  ): CheckoutToken | null => {
    if (cart === null) return null;

    const line_items: CheckoutToken['line_items'] = cart.lineItems.map(
      (lineItem) => ({
        ...lineItem,
        product_id: lineItem.productId,
        name: lineItem.productName,
        image: lineItem.productImage,
        description: '',
        price: priceNumberToFormattedPrice(lineItem.productPrice),
        subtotal: priceNumberToFormattedPrice(
          lineItem.productPrice * lineItem.quantity
        ),
      })
    );
    return {
      id: '13213',
      cart_id: cart.id,
      created: new Date(cart.createdAt).getTime(),
      expires: 0,
      line_items,
      live: {
        subtotal: priceNumberToFormattedPrice(cart.subtotal),
        total: priceNumberToFormattedPrice(cart.subtotal),
      },
    };
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top spacer (replacing Toolbar) */}
      <div className="h-16 md:h-20" />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-white rounded-lg shadow-md mx-auto my-8 p-4 md:p-8 lg:p-12 max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
            {'Ολοκλήρωση Παραγγελίας'}
          </h1>

          <Stepper
            steps={steps}
            activeStep={activeStep}
            className="mb-8"
            alternativeLabel
          />
          {activeStep === steps.length ? (
            <Confirmation orderResponse={orderResponse} />
          ) : (
            <CheckoutController
              activeStep={activeStep}
              next={next}
              nextStep={nextStep}
              backStep={backStep}
              checkoutOrderInfo={checkoutOrderInfo}
              handleCaptureCheckout={handleCaptureCheckout}
              checkoutToken={createCheckoutInfoFromCart(cart)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
