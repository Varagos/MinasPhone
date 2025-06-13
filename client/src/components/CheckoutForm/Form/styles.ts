import { styled } from '@mui/material/styles';

const PREFIX = 'CheckoutForm';

export const classes = {
  spinner: `${PREFIX}-spinner`,
};

export const Root = styled('div')(({ theme }) => ({
  [`& .${classes.spinner}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
