import theme from '@/lib/theme';
import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const drawerWidth = 0;

// https://stackoverflow.com/questions/69263383/what-is-the-alternative-of-makestyles-for-material-ui-v-5
export default makeStyles<typeof theme>((theme) => ({
  helperBar: {
    minHeight: '48px',
  },
  helperToolBar: {
    justifyContent: 'space-between',
  },
  authLink: {
    color: 'white',
    textDecoration: 'none',
    '-webkit-transition': 'color .4s',
    '-moz-transition': 'color .4s',
    '-ms-transition': 'color .4s',
    '-o-transition': 'color .4s',
    transition: 'color .4s',
    '&:hover': { color: 'black' },
  },
  appBar: {
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'flex-end',
  },
  navLinkHome: {
    color: theme.palette.secondary.main, // '#ffce2a',
    '&:hover': {
      color: theme.palette.secondary.light,
      backgroundColor: '#ffff',
    },
  },
  navLink: {
    flexGrow: 1,
    // color: '#000000',
    color: 'black',
    '&:hover': {
      color: '#ffce2a',
      backgroundColor: '#ffff',
    },
  },
  image: {
    marginRight: '10px',
    display: 'block',
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  standardNavLinks: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common?.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common?.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
