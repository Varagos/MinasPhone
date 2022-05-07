import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  root: {
    // maxWidth: '100%',
    // width: '100%',
    // height: '100%',
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
      // borderColor: '#ffce2a',
      // transform: 'translateY(-20px)',
      // color: '#ffce2a',
    },
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
