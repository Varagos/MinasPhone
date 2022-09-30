import React from 'react';
import { Typography, CircularProgress, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

import { useAppSelector } from '../../../redux/store';

const Confirmation = () => {
  const classes = useStyles();
  const orderResponse = useAppSelector((state) => state.checkout.orderResponse);
  const orderStatus = useAppSelector((state) => state.checkout.status);
  const errorMessage = useAppSelector((state) => state.checkout.error);

  if (orderStatus === 'failed') {
    console.error(errorMessage);
    return (
      <div>
        <Typography>{errorMessage}</Typography>
      </div>
    );
  }

  return orderResponse?.customer ? (
    <>
      <div>
        <Typography variant="h5">
          Σας ευχαριστούμε για την παραγγελία, {orderResponse.customer.firstname} {orderResponse.customer.lastname}
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Κωδικός παραγγελίας: {orderResponse.customer_reference}</Typography>
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
