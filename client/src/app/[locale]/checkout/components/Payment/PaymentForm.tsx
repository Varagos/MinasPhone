'use client';

import React from 'react';
// Keep MUI Tabs for now
import { Box, Divider, Tab, Tabs } from '@mui/material';
// Import shadcn components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

// MUI icons for now
import PaymentsSharpIcon from '@mui/icons-material/PaymentsSharp';
import CreditCardSharpIcon from '@mui/icons-material/CreditCardSharp';

import Review from '../Review';
// import CardPayment from './CardPayment';
import { CheckoutToken } from '@/types/checkout-token';
import { CheckoutCapture } from '@/types/checkout-capture';
import { CheckoutOrderInfo } from '../../page';
import { useTranslations } from 'use-intl';

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
  onCaptureCheckout: (newOrder: CheckoutCapture) => Promise<void>;
};
const PaymentForm = ({
  checkoutToken,
  shippingData,
  backStep,
  onCaptureCheckout,
  nextStep,
}: PaymentFormProps) => {
  const [value, setValue] = React.useState(0);
  const t = useTranslations('orders');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const orderData: CheckoutCapture = {
      line_items: checkoutToken.line_items,
      customer: {
        first_name: shippingData.firstName,
        last_name: shippingData.lastName,
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

    onCaptureCheckout(orderData);

    nextStep();
  };

  // console.log('FINAL SHIPPING DATA--', shippingData);
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <div className="flex justify-between items-center mt-6 mb-2">
        <h3 className="text-xl font-medium">{t('PAYMENT_METHODS')}</h3>
      </div>
      <Divider />

      <div className="flex flex-grow bg-background min-h-[224px]">
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
            label={t('STORE_CASH')}
            sx={{ textTransform: 'none', justifyContent: 'start' }}
            {...a11yProps(0)}
          />
          <Tab
            icon={<CreditCardSharpIcon />}
            iconPosition="end"
            label={t('STORE_CARD')}
            // disabled
            sx={{ textTransform: 'none', justifyContent: 'start' }}
            {...a11yProps(1)}
          />
          <Tab
            icon={<PaymentsSharpIcon />}
            iconPosition="end"
            label={t('CARD_PAYMENT')}
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
          <Card className="w-full min-w-[275px]">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                {t('STORE_CASH_DESC')}
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="default" size="lg" onClick={handleSubmit}>
                {t('CONFIRM')}
              </Button>
            </CardFooter>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Card className="w-full min-w-[275px]">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                {t('STORE_CARD_DESC')}
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="default" size="lg" onClick={handleSubmit}>
                {t('CONFIRM')}
              </Button>
            </CardFooter>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={2}></TabPanel>
      </div>
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={backStep}
          className="cursor-pointer"
        >
          {t('BACK')}
        </Button>
      </div>
    </>
  );
};

export default PaymentForm;
