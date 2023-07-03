import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';

import newLogo from '../../../public/free-logo-design (1).png';
import useStyles from './styles';
import AppDrawer from './AppDrawer/AppDrawer';
import { AppBar, Badge, Box, Button, IconButton, Snackbar, Toolbar, Typography } from '@mui/material';

import { PersonOutline, Phone, ShoppingCart, Menu as MenuIcon } from '@mui/icons-material';
import Image from 'next/image';
import IconLinkButton from '../custom-components/IconLinkButton';
import LinkButton from '../custom-components/LinkButton';
import { useAppSelector } from '@/redux/store';
import LogoutButton from './Logout/LogoutButton';

const NewNavbar = () => {
  const classes = useStyles();
  const router = useRouter();
  const currentPath = router.pathname;

  const [anchor, setAnchor] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authStatus = useAppSelector((state) => state.user.status);
  const user = useAppSelector((state) => state.user.data);
  //   const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      //   const res = await doesSessionExist();
      //   setIsLoggedIn(res);
      // console.log('RES IS ', res);
      //   if (res === true) {
      //     dispatch(userSignedIn());
      //     const userId = await Session.getUserId();
      //     const accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
      //     dispatch(userFetched({ ...accessTokenPayload, userId }));
      //   } else dispatch(userSignedOut());
    })();
  }, []);

  const cart = useAppSelector((state) => state.cart.data);

  const toggleDrawer = (open: any) => (event: any) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setAnchor(open);
  };

  function activeClass(path: any): any {
    if (currentPath === path) {
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
  }

  return (
    <div>
      <AppBar
        position={currentPath === '/' ? 'sticky' : 'static'}
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
            <Link href="/">
              <Image src={newLogo} alt="MinasPhone" className={classes.image} />
              {/* <img src={newLogo} alt="MinasPhone" className={classes.image} /> */}
            </Link>
          </Box>
          <div className={classes.grow} />
          <Box mr={12} className={classes.standardNavLinks}>
            <LinkButton href="/" sx={activeClass('/')}>
              ΑΡΧΙΚΗ
            </LinkButton>
            <LinkButton href="/category/smartphones" sx={activeClass('/category/smartphones')}>
              ΚΙΝΗΤΑ
            </LinkButton>
            <LinkButton href="/category/smartwatches" sx={activeClass('/category/smartwatches')}>
              SMARTWATCH
            </LinkButton>
            <LinkButton href="/category/tablets" sx={activeClass('/category/tablets')}>
              TABLET
            </LinkButton>
            <LinkButton href="/category/accessories" sx={activeClass('/category/accessories')}>
              ΑΞΕΣΟΥΑΡ
            </LinkButton>
            <LinkButton href="/products" sx={activeClass('/products')}>
              ΟΛΑ ΤΑ ΠΡΟΪΟΝΤΑ
            </LinkButton>
          </Box>
          <div>
            {user?.role === 'admin' && (
              <IconLinkButton aria-label="Admin panel" color="inherit" href="/dashboard">
                {/* <AdminPanelSettingsIcon fontSize="medium" style={{ verticalAlign: 'bottom', paddingBottom: 1 }} /> */}
              </IconLinkButton>
            )}
            {authStatus === 'signedIn' && <LogoutButton />}
            {/* {authStatus === 'signedOut' && (
              <IconButton aria-label="Login user" color="inherit" component={Link} to="/auth">
                <PersonOutline
                  fontSize="medium"
                  // color="black"
                  style={{ verticalAlign: 'bottom', paddingBottom: 1 }}
                />
              </IconButton>
            )} */}
          </div>
          {currentPath !== '/cart' && (
            <div>
              <IconLinkButton href="/cart" aria-label="Show cart items">
                <Badge badgeContent={cart?.total_items} color="secondary">
                  <ShoppingCart style={{ color: 'black' }} />
                </Badge>
              </IconLinkButton>
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

export default NewNavbar;
