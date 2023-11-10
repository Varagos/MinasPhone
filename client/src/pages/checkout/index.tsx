import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  CssBaseline,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import { CheckoutCapture } from '@/types/checkout-capture';
import LinkButton from '@/components/custom-components/LinkButton';
import Account from '@/components/CheckoutForm/Account';
import PaymentForm from '@/components/CheckoutForm/Payment/PaymentForm';
import Confirmation from '@/components/CheckoutForm/Confirmation/Confirmation';
import Form from '@/components/CheckoutForm/Form/Form';
import { useCart } from '@/hooks/useCart';
import { api } from '@/api';
import { CheckoutToken } from '@/types/checkout-token';
import { Cart } from '@/api/types/types';
import { Price } from '@/types/price';

export const priceNumberToFormattedPrice = (price: number): Price => ({
  raw: price,
  formatted: `$${price}`,
  formatted_with_symbol: `$${price}`,
  formatted_with_code: `$${price}`,
});

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
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutOrderInfo, setCheckoutOrderInfo] = useState<
    Partial<CheckoutOrderInfo>
  >({});
  const [error, setErrorMessage] = useState('');

  const { cart, setCart } = useCart();

  const handleCaptureCheckout = async (newOrder: CheckoutCapture) => {
    try {
      const { orderId } = await api.orders.checkoutOrder({
        contactInfo: {
          firstName: newOrder.customer.first_name,
          lastName: newOrder.customer.last_name,
          email: newOrder.customer.email,
          phone: `+30${newOrder.customer.phoneNumber}`,
        },
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

  // useEffect(() => {
  //   dispatch(generateCheckoutToken({ cartId: cart.id }));
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     // // console.log('cleaned up');
  //     dispatch(checkoutEnded());
  //   };
  // }, []);

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
        Back to Home
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
    <>
      <Head>
        <title>Minas Phone</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CssBaseline />
        <Toolbar />
        <main style={{ marginTop: '5%', width: 'auto' }}>
          <Paper
            sx={{
              mx: 20,
              marginTop: '5%',
              marginBottom: '5%',
              padding: '0 10%',
            }}
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
              <Confirmation />
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
    </>
  );
}