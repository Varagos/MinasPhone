import React from 'react';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { Root, classes } from './styles';
import { CheckoutCapture } from '@/types/checkout-capture';
import Account from '../Account';
import { CheckoutOrderInfo } from '@/_pages/checkout';
import PaymentForm from '../Payment/PaymentForm';
import Address from '../Address';
import { CheckoutToken } from '@/types/checkout-token';

export interface FormProps {
  activeStep: number;
  checkoutOrderInfo: Partial<CheckoutOrderInfo>;
  checkoutToken: CheckoutToken | null;
  next: (data: any) => void;
  nextStep: () => void;
  backStep: () => void;
  handleCaptureCheckout: (newOrder: CheckoutCapture) => Promise<void>;
}
export default function Form(props: FormProps): JSX.Element {
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
      <Root className={classes.spinner}>
        <CircularProgress />
      </Root>
    );
  }

  switch (activeStep) {
    case 0:
      return <Account next={next} />;
    case 1:
      return (
        <Address
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
      return <Typography>Unknown checkout step</Typography>;
  }
}
