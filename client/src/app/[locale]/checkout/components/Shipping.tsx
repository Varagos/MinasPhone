'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

import Review from './Review';
import { CheckoutToken } from '@/types/checkout-token';

type AddressProps = {
  checkoutToken: CheckoutToken;
  next: (data: any) => void;
  backStep: () => void;
  shippingData: any;
};

type FormValues = {
  receiptMethod: 'store' | 'courier';
};
const Shipping = ({
  checkoutToken,
  shippingData,
  backStep,
  next,
}: AddressProps) => {
  const { register, handleSubmit, control } = useForm();

  // const handleSubmit = async (event: any, elements: any, stripe: any) => {
  //   event.preventDefault();

  //   nextStep();
  // };
  const onSubmit = (data: any) => {
    // console.log('Address data', data);
    next({
      ...shippingData,
      ...(data as FormValues),
    });
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Separator className="my-6" />
      <h2 className="text-xl font-semibold mb-6">{'Τρόπος παραλαβής'}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <Controller
            rules={{ required: true }}
            control={control}
            name="receiptMethod"
            defaultValue={'store'}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors">
                  <RadioGroupItem 
                    value="store" 
                    id="store" 
                    className="h-5 w-5 border-2 data-[state=checked]:border-primary data-[state=checked]:border-2"
                  />
                  <Label htmlFor="store" className="cursor-pointer font-medium">
                    {"Παραλαβή από το κατάστημα"}
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-200 rounded-md p-4 opacity-70">
                  <RadioGroupItem 
                    value="courier" 
                    id="courier" 
                    disabled 
                    className="h-5 w-5 border-2"
                  />
                  <Label htmlFor="courier" className="cursor-not-allowed text-gray-400">
                    {"Αποστολή στο χώρο σας"}
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
        </div>

        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={backStep}
            className="cursor-pointer"
          >
            Back
          </Button>
          <Button type="submit" className="cursor-pointer">
            Next
          </Button>
        </div>
      </form>
    </>
  );
};

export default Shipping;
