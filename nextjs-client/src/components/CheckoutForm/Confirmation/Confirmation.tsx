import React from 'react';
import { Typography, CircularProgress, Divider, Button } from '@mui/material';

import useStyles from './styles';

import LinkButton from '@/components/custom-components/LinkButton';
import { CheckoutCaptureResponse } from '@/types/checkout-capture-response';

const Confirmation = () => {
  const classes = useStyles();
  const orderResponse: CheckoutCaptureResponse | null = {
    customer: {
      firstname: 'Γιάννης',
      lastname: 'Παπαδόπουλος',
    },
    customer_reference: '123456789',
  } as CheckoutCaptureResponse;
  const orderStatus: 'idle' | 'loading' | 'success' | 'failed' = 'success';
  const errorMessage = '';
  // const orderResponse = useAppSelector((state) => state.checkout.orderResponse);
  // const orderStatus = useAppSelector((state) => state.checkout.status);
  // const errorMessage = useAppSelector((state) => state.checkout.error);

  // if (orderStatus === 'failed') {
  //   console.error(errorMessage);
  //   return (
  //     <div>
  //       <Typography>{errorMessage}</Typography>
  //     </div>
  //   );
  // }

  return orderResponse?.customer ? (
    <>
      <div>
        <Typography variant="h5">
          Σας ευχαριστούμε για την παραγγελία,{' '}
          {orderResponse.customer.firstname} {orderResponse.customer.lastname}
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">
          Κωδικός παραγγελίας: {orderResponse.customer_reference}
        </Typography>
      </div>
      <br />
      <LinkButton href="/" variant="outlined" type="button">
        Πίσω στην αρχική
      </LinkButton>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  );
};
export default Confirmation;
