'use client';
import React, { useState } from 'react';

import Confirmation, {
  CheckoutOrderResponse,
} from './components/Confirmation/Confirmation';
import CheckoutController from './components/CheckoutController/CheckoutController';
import { useCart } from '@/hooks/useCart';
import { api } from '@/api';
import { CheckoutInfo } from '@/types/checkout-token';
import { Cart, CheckoutOrderParams } from '@/api/types/types';
import { priceNumberToFormattedPrice } from '@/utils/prices';
import { useTranslations } from 'next-intl';
import { Stepper } from '@/components/ui/stepper';

const steps = ['Λογαριασμός', 'Διέυθυνση', 'Πληρωμή'];

export type CheckoutOrderInfo = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export default function Checkout() {
  const t = useTranslations('orders');
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutOrderInfo, setCheckoutOrderInfo] = useState<
    Partial<CheckoutOrderInfo>
  >({});

  const [orderResponse, setOrderResponse] =
    useState<CheckoutOrderResponse | null>(null);

  const { cart, setCart } = useCart();

  const handleCaptureCheckout = async (newOrder: CheckoutOrderParams) => {
    const orderResult = await api.orders.checkoutOrder({
      contactInfo: {
        ...newOrder.contactInfo,
        phone: `+30${newOrder.contactInfo.phone}`,
      },
    });
    console.log('orderResult', orderResult);
    setOrderResponse({
      customer: {
        firstName: checkoutOrderInfo.firstName || '',
        lastName: checkoutOrderInfo.lastName || '',
      },
      orderReference: orderResult.orderId,
    });

    await api.cart.clearCart();
    // TODO handle this bug, when null confirmation is not shown properly.
    // One solution could be confirmation to be on some other page.
    // setCart(null); // Clear the cart after successful order capture

    // Navigate to orderId page
  };
  if (!cart) return <div>No cart</div>;

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

  const createCheckoutInfoFromCart = (cart: Cart): CheckoutInfo => {
    const line_items: CheckoutInfo['line_items'] = cart.lineItems.map(
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
      cart_id: cart.id,
      line_items,
      total: priceNumberToFormattedPrice(cart.subtotal),
    };
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top spacer (replacing Toolbar) */}
      <div className="h-16 md:h-20" />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-white rounded-lg shadow-md mx-auto my-8 p-4 md:p-8 lg:p-12 max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
            {t('CHECKOUT_TITLE')}
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
              checkoutInfo={createCheckoutInfoFromCart(cart)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
