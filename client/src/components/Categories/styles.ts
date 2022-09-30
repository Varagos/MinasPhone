import { makeStyles } from '@mui/styles';
import { theme } from '../../App';

export default makeStyles<typeof theme>((theme) => ({
  // toolbar: theme.mixins.toolbar,
  content: {
    backgroundColor: theme.palette.background.default,
    // backgroundColor: 'black',
    // padding: 2000,
  },
  media: {
    width: '100%',
    height: 'auto',
  },
  sectionTitle: {
    fontWeight: '900',
    borderBottom: 'thick solid #6A2C70',
    paddingBottom: '3px',
    marginBottom: '40px',
  },
  stretch: { height: '100%' },
  item: { display: 'flex', flexDirection: 'column' }, // KEY CHANGES
}));
