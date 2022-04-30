import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '1px solid #ddd',
    '-webkit-transition': 'transform .6s, color .4s',
    '-moz-transition': 'color .4s',
    '-ms-transition': 'color .4s',
    '-o-transition': 'color .4s',
    transition: 'transform .6s, color .4s',
    '&:hover': {
      borderStyle: 'solid',
      borderColor: '#ffce2a',
      transform: 'translateY(-20px)',
      color: '#ffce2a',
    },
  },
  media: {
    maxWidth: '80%',
    maxHeight: '300px',
    objectFit: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '25px',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
