import React, { useState, useEffect } from 'react';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from '@mui/material';
import { Link, useHistory } from 'react-router-dom';

import { commerce } from '../../lib/commerce';
import Account from '../Account';
import PaymentForm from '../Payment/PaymentForm';

import useStyles from './styles';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { useAppSelector } from '../../../redux/store';
import Address from '../Address';

const steps = ['Λογαριασμός', 'Διέυθυνση', 'Πληρωμή'];

const Checkout = ({ order, onCaptureCheckout, error }: any) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState<CheckoutToken | null>(null);
  const [shippingData, setShippingData] = useState<any>({});
  const classes = useStyles();
  const history = useHistory();

  const cart = useAppSelector((state) => state.cart.data);

  if (!cart) return <div>No cart</div>;

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

        setCheckoutToken(token);
      } catch (error) {
        (history as any).pushState('/');
      }
    };

    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data: any) => {
    console.log('NEXT function', data);
    setShippingData(data);
    nextStep();
  };

  const Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  if (error) {
    <>
      <Typography variant="h5">Error: {error}</Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>;
  }

  const Form = () =>
    activeStep === 0 ? (
      <Account checkoutToken={checkoutToken} next={next} />
    ) : activeStep === 1 ? (
      <Address
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        next={next}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
      />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken!}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper} sx={{ mx: 20 }}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
