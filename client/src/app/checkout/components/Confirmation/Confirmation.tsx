import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';

import { Root, classes } from './styles';

import LinkButton from '@/_components/common/LinkButton';

export type CheckoutOrderResponse = {
  customer: {
    firstName: string;
    lastName: string;
  };
  orderReference: string;
};

type ConfirmationProps = {
  orderResponse: CheckoutOrderResponse | null;
};
const Confirmation = ({ orderResponse }: ConfirmationProps) => {
  // const orderResponse: CheckoutCaptureResponse | null = {
  //   customer: {
  //     firstname: 'Γιάννης',
  //     lastname: 'Παπαδόπουλος',
  //   },
  //   customer_reference: '123456789',
  // } as CheckoutCaptureResponse;
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

  return orderResponse !== null ? (
    <Root>
      <div style={{ marginTop: 30 }}>
        <Typography variant="h5">
          Σας ευχαριστούμε για την παραγγελία,{' '}
          {orderResponse.customer.firstName} {orderResponse.customer.lastName}
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">
          Κωδικός παραγγελίας: <strong>{orderResponse.orderReference}</strong>
        </Typography>
        <Typography variant="body2" style={{ marginTop: '16px' }}>
          Έχουμε στείλει ένα email επιβεβαίωσης με τις λεπτομέρειες της
          παραγγελίας σας. Παρακαλώ ελέγξτε το email σας (και τον φάκελο
          ανεπιθύμητης αλληλογραφίας).
        </Typography>
      </div>
      <br />
      <LinkButton href="/" variant="outlined" type="button">
        Πίσω στην αρχική
      </LinkButton>
    </Root>
  ) : (
    <Root>
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    </Root>
  );
};
export default Confirmation;
