import React from 'react';
import { Typography, CircularProgress, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';

const Confirmation = ({ order }: { order: CheckoutCaptureResponse | null }) => {
  const classes = useStyles();

  return order?.customer ? (
    <>
      <div>
        <Typography variant="h5">
          Σας ευχαριστούμε για την παραγγελία, {order.customer.firstname} {order.customer.lastname}
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Κωδικός παραγγελίας: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Πίσω στην αρχική
      </Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  );
};
export default Confirmation;
