import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import newLogo from '../../assets/free-logo-design (1).png';
import useStyles from './styles';
import AppDrawer from './AppDrawer/AppDrawer';
import { Alert, AppBar, Badge, Box, Button, IconButton, Snackbar, Toolbar, Typography } from '@mui/material';

import { PersonOutline, Phone, ShoppingCart, Menu as MenuIcon } from '@mui/icons-material';
import LoginForm from '../Register/LoginDialog/LoginForm';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { doesSessionExist } from 'supertokens-auth-react/recipe/session';
import Session from 'supertokens-auth-react/recipe/session';

import LogoutButton from './Logout/LogoutButton';
import { userFetched, userSignedIn, userSignedOut } from '../../redux/userSlice';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const [anchor, setAnchor] = useState(false);
  // const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authStatus = useAppSelector((state) => state.user.status);
  const user = useAppSelector((state) => state.user.data);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const res = await doesSessionExist();
      setIsLoggedIn(res);
      // console.log('RES IS ', res);
      if (res === true) {
        dispatch(userSignedIn());
        const userId = await Session.getUserId();
        const accessTokenPayload = await Session.getAccessTokenPayloadSecurely();

        dispatch(userFetched({ ...accessTokenPayload, userId }));
      } else dispatch(userSignedOut());
    })();
  }, []);

  const cart = useAppSelector((state) => state.cart.data);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const toggleDrawer = (open: any) => (event: any) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setAnchor(open);
  };

  function activeClass(currentPath: any): any {
    if (location.pathname === currentPath) {
      return {
        color: '#ffce2a',
        '&:hover': {
          backgroundColor: '#ffff',
        },
      };
    }

    return {
      textDecoration: 'none',
      color: 'black',
      transition: 'all .5s ease-in-out',
      '&:hover': {
        color: '#ffce2a',
        backgroundColor: '#ffff',
      },
    };
    if (location.pathname === currentPath) return classes.navLinkHome;
    return classes.navLink;
  }

  return (
    <div>
      <AppBar
        position={location.pathname === '/' ? 'sticky' : 'static'}
        className={classes.helperBar}
        sx={{
          backgroundColor: '#ffce2a',
          display: { xs: 'none', md: 'block' },
          px: 8,
        }}
      >
        <Toolbar variant="dense" className={classes.helperToolBar}>
          <Box>
            <Phone fontSize="inherit" color="primary" sx={{ color: 'black' }} />
            <Box pl={2} style={{ display: 'inline-block' }}>
              <Typography variant="h6">210 9224 764</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <AppBar position="static" className={classes.appBar} color="inherit">
        <Toolbar>
          <Box className={classes.title} color="inherit">
            <Link to="/">
              <img src={newLogo} alt="MinasPhone" className={classes.image} />
            </Link>
          </Box>
          <div className={classes.grow} />
          <Box mr={12} className={classes.standardNavLinks}>
            <Button component={Link} to="/" sx={activeClass('/')}>
              ΑΡΧΙΚΗ
            </Button>
            <Button component={Link} to="/category/smartphones" sx={activeClass('/category/smartphones')}>
              ΚΙΝΗΤΑ
            </Button>
            <Button component={Link} to="/category/smartwatches" sx={activeClass('/category/smartwatches')}>
              SMARTWATCH
            </Button>
            <Button component={Link} to="/category/tablets" sx={activeClass('/category/tablets')}>
              TABLET
            </Button>
            <Button component={Link} to="/category/accessories" sx={activeClass('/category/accessories')}>
              ΑΞΕΣΟΥΑΡ
            </Button>
            <Button component={Link} to="/products" sx={activeClass('/products')}>
              ΟΛΑ ΤΑ ΠΡΟΪΟΝΤΑ
            </Button>
          </Box>
          <div>
            {user?.role === 'admin' && (
              <IconButton aria-label="Admin panel" color="inherit" component={Link} to="/dashboard">
                <AdminPanelSettingsIcon fontSize="medium" style={{ verticalAlign: 'bottom', paddingBottom: 1 }} />
              </IconButton>
            )}
            {authStatus === 'signedIn' && <LogoutButton />}
            {authStatus === 'signedOut' && (
              <IconButton aria-label="Login user" color="inherit" component={Link} to="/auth">
                <PersonOutline
                  fontSize="medium"
                  // color="black"
                  style={{ verticalAlign: 'bottom', paddingBottom: 1 }}
                />
              </IconButton>
            )}
          </div>
          {/* <LoginForm open={open} handleClose={handleClose} /> */}
          {location.pathname !== '/cart' && (
            <div>
              <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                <Badge badgeContent={cart?.total_items} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
          <IconButton
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            onClick={toggleDrawer(true)}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            <Badge>
              <MenuIcon fontSize="large" />
            </Badge>
          </IconButton>
          <AppDrawer anchor={anchor} toggleDrawer={toggleDrawer} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
