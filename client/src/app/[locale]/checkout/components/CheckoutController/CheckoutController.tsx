'use client';

import React from 'react';
import Account from './Account';
import PaymentForm from './PaymentForm';
import Shipping from './Shipping';
import { CheckoutInfo } from '@/types/checkout-token';
import { CheckoutOrderInfo } from '../../page';
import { CheckoutOrderParams } from '@/api/types/orders';

export interface FormProps {
  activeStep: number;
  checkoutOrderInfo: Partial<CheckoutOrderInfo>;
  checkoutInfo: CheckoutInfo;
  next: (data: Partial<CheckoutOrderInfo>) => void;

  nextStep: () => void;
  backStep: () => void;
  handleCaptureCheckout: (newOrder: CheckoutOrderParams) => Promise<void>;
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
    checkoutInfo,
  } = props;

  switch (activeStep) {
    case 0:
      return <Account next={next} />;
    case 1:
      return (
        <Shipping
          shippingData={checkoutOrderInfo}
          checkoutInfo={checkoutInfo}
          next={next}
          backStep={backStep}
        />
      );
    case 2:
      return (
        <PaymentForm
          shippingData={checkoutOrderInfo as CheckoutOrderInfo}
          checkoutInfo={checkoutInfo}
          nextStep={nextStep}
          backStep={backStep}
          onCaptureCheckout={handleCaptureCheckout}
        />
      );
    default:
      return (
        <p className="text-lg text-red-600 text-center p-4">
          {'Unknown checkout step'}
        </p>
      );
  }
}
