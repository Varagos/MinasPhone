import { makeStyles } from '@mui/styles';

export default makeStyles((theme: any) => ({
  toolbar: theme.mixins?.toolbar,
  stretch: { height: '100%' },
  item: { display: 'flex', flexDirection: 'column' }, // KEY CHANGES
  main: {
    border: '1px solid #D3D3D3',
    height: '100%',
    color: '#000',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    '-webkit-transition': 'transform 1s, color .4s',
    '&:hover': {
      borderColor: '#ffce2a',
      transform: 'translateY(-10px)',
      color: '#ffce2a',
    },
  },
  bannerImg: {
    objectFit: 'cover',
    width: '100%',
    // height: 250px;
    height: '100%',
    // height: 'auto',
  },
  bannerText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    left: '0%',
    right: '0%',
    textAlign: 'center',
    paddingBottom: '10px',
  },
}));
