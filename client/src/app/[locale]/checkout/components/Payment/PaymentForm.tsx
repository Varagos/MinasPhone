'use client';

import React from 'react';
// Shadcn components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// Lucide icons (commonly used with Shadcn)
import { Wallet, CreditCard } from 'lucide-react';

import Review from '../Review';
// import CardPayment from './CardPayment';
import { CheckoutToken } from '@/types/checkout-token';
import { CheckoutCapture } from '@/types/checkout-capture';
import { CheckoutOrderInfo } from '../../page';
import { useTranslations } from 'use-intl';

// Removed TabPanel and a11yProps functions as they're no longer needed with Shadcn Tabs

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

  // handleChange is no longer needed as we're using onValueChange with the Shadcn Tabs

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
      <Separator className="my-4" />

      <div className="flex flex-grow bg-background min-h-[224px]">
        <Tabs 
          defaultValue="0" 
          orientation="vertical" 
          value={String(value)} 
          onValueChange={(val) => setValue(parseInt(val))} 
          className="flex flex-col md:flex-row w-full md:space-x-4"
        >
          <TabsList className="w-full md:w-auto border-b md:border-b-0 md:border-r border-border md:space-y-2 py-2 flex md:flex-col overflow-x-auto">
            <TabsTrigger
              value="0"
              className="flex flex-1 md:flex-none justify-between gap-2 text-base font-medium py-3"
            >
              {t('STORE_CASH')}
              <Wallet className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger
              value="1"
              className="flex flex-1 md:flex-none justify-between gap-2 text-base font-medium py-3"
            >
              {t('STORE_CARD')}
              <CreditCard className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger
              value="2"
              className="flex flex-1 md:flex-none justify-between gap-2 text-base font-medium py-3"
              disabled
            >
              {t('CARD_PAYMENT')}
              <Wallet className="h-5 w-5" />
            </TabsTrigger>
            {/* Removed the commented out tab */}
          </TabsList>

          <TabsContent value="0" className="flex-1">
            <Card className="w-full min-w-[275px] mt-4">
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
          </TabsContent>

          <TabsContent value="1" className="flex-1">
            <Card className="w-full min-w-[275px] mt-4">
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
          </TabsContent>

          <TabsContent value="2" className="flex-1">
            {/* Empty content for disabled tab */}
          </TabsContent>
        </Tabs>
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
