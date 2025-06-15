import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import Review from './Review';
import { Controller, useForm } from 'react-hook-form';
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
const Address = ({
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
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
        Τρόπος παραλαβής
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl component="fieldset">
          {/* <FormLabel component="legend">Τρόπος παραλαβής</FormLabel> */}

          {/* render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => ( */}
          <Controller
            rules={{ required: true }}
            control={control}
            name="receiptMethod"
            defaultValue={'store'}
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                value={value}
                // defaultValue="store"
                onChange={(e) => {
                  onChange(e);
                  // console.log(e.target.value); // will be called this time
                }}
              >
                <FormControlLabel
                  value="store"
                  control={<Radio />}
                  label="Παραλαβή από το κατάστημα"
                />
                <FormControlLabel
                  value="courier"
                  control={<Radio />}
                  label="Αποστολή στο χώρο σας"
                  disabled
                />
              </RadioGroup>
            )}
            // as={
            //   <RadioGroup defaultValue="store">
            //     <FormControlLabel value="store" control={<Radio />} label="Παραλαβή από το κατάστημα" />
            //     <FormControlLabel value="courier" control={<Radio />} label="Αποστολή στο χώρο σας" />
            //   </RadioGroup>
            // }
          />
        </FormControl>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          <Button variant="outlined" onClick={backStep}>
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </div>
      </form>
    </>
  );
};

export default Address;
