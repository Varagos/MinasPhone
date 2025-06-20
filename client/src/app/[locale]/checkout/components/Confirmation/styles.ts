import { styled } from '@mui/material/styles';

const PREFIX = 'Confirmation';

export const classes = {
  appBar: `${PREFIX}-appBar`,
  toolbar: `${PREFIX}-toolbar`,
  layout: `${PREFIX}-layout`,
  paper: `${PREFIX}-paper`,
  stepper: `${PREFIX}-stepper`,
  buttons: `${PREFIX}-buttons`,
  button: `${PREFIX}-button`,
  divider: `${PREFIX}-divider`,
  spinner: `${PREFIX}-spinner`,
};

export const Root = styled('div')(({ theme }) => ({
  [`& .${classes.appBar}`]: {
    position: 'relative',
  },
  [`& .${classes.toolbar}`]: theme.mixins.toolbar,
  [`& .${classes.layout}`]: {
    marginTop: '5%',
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  [`& .${classes.paper}`]: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: 60,
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  [`& .${classes.stepper}`]: {
    padding: theme.spacing(3, 0, 5),
  },
  [`& .${classes.buttons}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  [`& .${classes.button}`]: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  [`& .${classes.divider}`]: {
    margin: '20px 0',
  },
  [`& .${classes.spinner}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
