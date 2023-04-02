import React from 'react';
import {
  Typography,
  Button,
  Divider,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
// import { CardElement } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import PaymentsSharpIcon from '@mui/icons-material/PaymentsSharp';
import CreditCardSharpIcon from '@mui/icons-material/CreditCardSharp';

import Review from '../Review';
import CardPayment from './CardPayment';
import { CheckoutToken } from '../../../types/checkout-token';
import { CheckoutCapture } from '../../../types/checkout-capture';
import { CheckoutOrderInfo } from '@/pages/checkout';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: '100%' }}
      {...other}
    >
      {value === index && (
        <Box
          sx={{ p: 3 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="20vh"
          minWidth="70%"
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);
type PaymentFormProps = {
  checkoutToken: CheckoutToken;
  shippingData: CheckoutOrderInfo;
  backStep: any;
  nextStep: any;
  onCaptureCheckout: (
    checkoutTokenId: string,
    newOrder: CheckoutCapture
  ) => Promise<void>;
};
const PaymentForm = ({
  checkoutToken,
  shippingData,
  backStep,
  onCaptureCheckout,
  nextStep,
}: PaymentFormProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const orderData = {
      line_items: checkoutToken.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
        phoneNumber: shippingData.phoneNumber,
      },
      shipping: {
        name: 'Primary',
        street: shippingData.street ?? 'Glyfada',
        town_city: shippingData.town_city ?? 'athens',
        county_state: shippingData.shippingSubdivision,
        postal_zip_code: shippingData.postal_zip_code ?? '19152',
        country: shippingData.shippingCountry,
      },
      fulfillment: { shipping_method: shippingData.shippingOption },
      payment: {
        gateway: 'test_gateway',
        card: {
          number: '4242424242424242',
          expiry_month: '02',
          expiry_year: '24',
          cvc: '123',
          postal_zip_code: '94107',
        },
      },
    };
    // console.log(orderData);

    onCaptureCheckout(checkoutToken.id, orderData);

    nextStep();
  };

  // console.log('FINAL SHIPPING DATA--', shippingData);
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
        Τρόποι Πληρωμής
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          minHeight: 224,
        }}
      >
        <Tabs
          orientation="vertical"
          // variant="scrollable"
          variant="standard"
          value={value}
          onChange={handleChange}
          aria-label="Payment method"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab
            icon={<PaymentsSharpIcon />}
            iconPosition="end"
            label="Μετρητά στο κατάστημα"
            sx={{ textTransform: 'none', justifyContent: 'start' }}
            {...a11yProps(0)}
          />
          <Tab
            icon={<CreditCardSharpIcon />}
            iconPosition="end"
            label="Κάρτα στο κατάστημα"
            disabled
            sx={{ textTransform: 'none', justifyContent: 'start' }}
            {...a11yProps(1)}
          />
          <Tab
            icon={<PaymentsSharpIcon />}
            iconPosition="end"
            label="Πληρωμή με κάρτα"
            disabled
            sx={{ textTransform: 'none', justifyContent: 'start' }}
            {...a11yProps(2)}
          />
          {/* <Tab
            icon={<AccountBalanceSharpIcon />}
            iconPosition="end"
            label="Τραπεζική Κατάθεση"
            sx={{ textTransform: 'none', justifyContent: 'start' }}
            {...a11yProps(3)}
          /> */}
        </Tabs>
        <TabPanel value={value} index={0}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Η παραγγελία σας θα πληρωθεί στο κατάστημα μας με μετρητά.
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={handleSubmit}
              >
                Επιβεβαίωση παραγγελίας
              </Button>
            </CardActions>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Η παραγγελία σας θα πληρωθεί στο κατάστημα μας με χρήση
                πιστωτικής ή χρεωστικής κάρτας.
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={handleSubmit}
              >
                Επιβεβαίωση παραγγελίας
              </Button>
            </CardActions>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CardPayment
            checkoutToken={checkoutToken}
            onCaptureCheckout={onCaptureCheckout}
            shippingData={shippingData}
            nextStep={nextStep}
          />
        </TabPanel>
        {/* <TabPanel value={value} index={3}>
          Item Four
        </TabPanel> */}
      </Box>
    </>
  );
};

export default PaymentForm;
