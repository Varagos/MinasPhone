'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { CheckoutCapture } from '@/types/checkout-capture';
import LinkButton from '@/components/common/LinkButton';
import Confirmation, {
  CheckoutOrderResponse,
} from './components/Confirmation/Confirmation';
import Form from './components/Form/Form';
import { useCart } from '@/hooks/useCart';
import { api } from '@/api';
import { CheckoutToken } from '@/types/checkout-token';
import { Cart } from '@/api/types/types';
import { priceNumberToFormattedPrice } from '@/utils/prices';
import { Viewport } from 'next';
import { useTranslations } from 'next-intl';

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
    <>
      <Typography variant="h5">Error: {error}</Typography>
      <br />
      <LinkButton href="/" variant="outlined" type="button">
        {t('BACK_TO_HOME')}
      </LinkButton>
    </>;
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
    <main>
      <Toolbar />
      <main style={{ marginTop: '5%', width: 'auto' }}>
        <Paper
          sx={(theme) => ({
            marginX: 20,
            marginTop: '5%',
            marginBottom: '5%',
            padding: '10%',
            [theme.breakpoints.down('sm')]: {
              marginX: 2,
              // marginTop: '10%',
              // marginBottom: '10%',
              padding: 2,
            },
          })}
        >
          <Typography variant="h4" align="center">
            Ολοκλήρωση Παραγγελίας
          </Typography>
          <Stepper activeStep={activeStep} sx={{ padding: '0 10%' }}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation orderResponse={orderResponse} />
          ) : (
            <Form
              activeStep={activeStep}
              next={next}
              nextStep={nextStep}
              backStep={backStep}
              checkoutOrderInfo={checkoutOrderInfo}
              handleCaptureCheckout={handleCaptureCheckout}
              checkoutToken={createCheckoutInfoFromCart(cart)}
            />
          )}
        </Paper>
      </main>
    </main>
  );
}
