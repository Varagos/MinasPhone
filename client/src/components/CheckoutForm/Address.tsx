import React from 'react';
import {
  Typography,
  Button,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

import Review from './Review';
import { Controller, FormProvider, useForm } from 'react-hook-form';

type AddressProps = {
  checkoutToken: any;
  next: (data: any) => void;
  backStep: () => void;
  shippingData: any;
};
const Address = ({ checkoutToken, shippingData, backStep, next }: AddressProps) => {
  const { register, handleSubmit, control } = useForm();

  // const handleSubmit = async (event: any, elements: any, stripe: any) => {
  //   event.preventDefault();

  //   nextStep();
  // };
  const onSubmit = (data: any) => {
    next({
      ...shippingData,
      ...data,
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
                <FormControlLabel value="store" control={<Radio />} label="Παραλαβή από το κατάστημα" />
                <FormControlLabel value="courier" control={<Radio />} label="Αποστολή στο χώρο σας" disabled />
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

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
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
