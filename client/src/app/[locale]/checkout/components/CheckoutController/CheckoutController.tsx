'use client';

import React from 'react';
import { CheckoutCapture } from '@/types/checkout-capture';
import Account from '../Account';
import PaymentForm from '../Payment/PaymentForm';
import Shipping from '../Shipping';
import { CheckoutToken } from '@/types/checkout-token';
import { CheckoutOrderInfo } from '../../page';

export interface FormProps {
  activeStep: number;
  checkoutOrderInfo: Partial<CheckoutOrderInfo>;
  checkoutToken: CheckoutToken | null;
  next: (data: any) => void;
  nextStep: () => void;
  backStep: () => void;
  handleCaptureCheckout: (newOrder: CheckoutCapture) => Promise<void>;
}
export default function CheckoutController(
  props: FormProps
): React.JSX.Element {
  const {
    activeStep,
    next,
    nextStep,
    backStep,
    handleCaptureCheckout,
    checkoutOrderInfo,
    checkoutToken,
  } = props;

  if (checkoutToken === null) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  switch (activeStep) {
    case 0:
      return <Account next={next} />;
    case 1:
      return (
        <Shipping
          shippingData={checkoutOrderInfo}
          checkoutToken={checkoutToken}
          next={next}
          backStep={backStep}
        />
      );
    case 2:
      return (
        <PaymentForm
          shippingData={checkoutOrderInfo as CheckoutOrderInfo}
          checkoutToken={checkoutToken}
          nextStep={nextStep}
          backStep={backStep}
          onCaptureCheckout={handleCaptureCheckout}
        />
      );
    default:
      return <p className="text-lg text-red-600 text-center p-4">{"Unknown checkout step"}</p>;
  }
}
