import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import {
  Elements,
  CardElement,
  ElementsConsumer,
  PaymentElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);
const CardPayment = ({
  checkoutToken,
  shippingData,
  onCaptureCheckout,
  nextStep,
}: any) => {
  const handleSubmit = async (
    event: any,
    elements: StripeElements | null,
    stripe: Stripe | null
  ) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      // console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: 'Primary',
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      // console.log(orderData);

      onCaptureCheckout(checkoutToken.id, orderData);

      nextStep();
    }
  };
  return (
    <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {({ elements, stripe }) => (
          <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
            <Card sx={{ minWidth: 400 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14, mb: 3 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Πληρωμή με κάρτα
                </Typography>
                <CardElement />
                <br /> <br />
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!stripe}
                    color="secondary"
                  >
                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                  </Button>
                </div>
              </CardActions>
            </Card>
          </form>
        )}
      </ElementsConsumer>
    </Elements>
  );
};

export default CardPayment;
