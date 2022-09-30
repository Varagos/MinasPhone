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
import { Link, useNavigate } from 'react-router-dom';

import { commerce } from '../../lib/commerce';
import Account from '../Account';
import PaymentForm from '../Payment/PaymentForm';

import useStyles from './styles';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import Address from '../Address';
import { refreshCart } from '../../../redux/slices/cart';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';
import Confirmation from './Confirmation';
import { captureCheckoutOrder, checkoutEnded, generateCheckoutToken } from '../../../redux/slices/checkout';

const steps = ['Λογαριασμός', 'Διέυθυνση', 'Πληρωμή'];

type FormProps = {
  activeStep: number;
  next: (data: any) => void;
  nextStep: () => void;
  backStep: () => void;
  handleCaptureCheckout: (checkoutTokenId: string, newOrder: CheckoutCapture) => void;
  shippingData: any;
};

const Form = (props: FormProps): JSX.Element => {
  const { activeStep, next, nextStep, backStep, handleCaptureCheckout, shippingData } = props;
  const classes = useStyles();
  const checkoutToken = useAppSelector((state) => state.checkout.token);

  if (checkoutToken === null) {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  }

  switch (activeStep) {
    case 0:
      return <Account checkoutToken={checkoutToken} next={next} />;
    case 1:
      return <Address shippingData={shippingData} checkoutToken={checkoutToken} next={next} backStep={backStep} />;
    case 2:
      return (
        <PaymentForm
          shippingData={shippingData}
          checkoutToken={checkoutToken}
          nextStep={nextStep}
          backStep={backStep}
          onCaptureCheckout={handleCaptureCheckout}
        />
      );
    default:
      return <Typography>Unknown checkout step</Typography>;
  }
};

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState<any>({});
  const [error, setErrorMessage] = useState('');

  const classes = useStyles();

  const cart = useAppSelector((state) => state.cart.data);
  const dispatch = useAppDispatch();

  const handleCaptureCheckout = async (checkoutTokenId: string, newOrder: CheckoutCapture) => {
    try {
      // const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      await dispatch(captureCheckoutOrder({ checkoutTokenId: checkoutTokenId, newOrder })).unwrap();

      dispatch(refreshCart());
    } catch (error) {
      setErrorMessage('There was an error capturing checkout' + (error as any).data.error.message);
    }
  };
  if (!cart) return <div>No cart</div>;

  useEffect(() => {
    dispatch(generateCheckoutToken({ cartId: cart.id }));
  }, []);

  useEffect(() => {
    return () => {
      // // console.log('cleaned up');
      dispatch(checkoutEnded());
    };
  }, []);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data: any) => {
    // console.log('NEXT function', data);
    setShippingData(data);
    nextStep();
  };

  if (error) {
    <>
      <Typography variant="h5">Error: {error}</Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>;
  }

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper} sx={{ mx: 20 }}>
          <Typography variant="h4" align="center">
            Ολοκλήρωση Παραγγελίας
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
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
              shippingData={shippingData}
              handleCaptureCheckout={handleCaptureCheckout}
            />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
