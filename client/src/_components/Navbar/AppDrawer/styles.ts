import { styled } from '@mui/material/styles';

const PREFIX = 'AppDrawer';

export const classes = {
  list: `${PREFIX}-list`,
  fullList: `${PREFIX}-fullList`,
};

export const Root = styled('div')(({ theme }) => ({
  [`& .${classes.list}`]: {
    width: 250,
  },
  [`& .${classes.fullList}`]: {
    width: 'auto',
  },
}));
