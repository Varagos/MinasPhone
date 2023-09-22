import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';

import newLogo from '../../../public/free-logo-design (1).png';
import useStyles from './styles';
import AppDrawer from './AppDrawer/AppDrawer';
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Snackbar,
  Toolbar,
  Typography,
} from '@mui/material';

import {
  PersonOutline,
  Phone,
  ShoppingCart,
  Menu as MenuIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import IconLinkButton from '../custom-components/IconLinkButton';
import LinkButton from '../custom-components/LinkButton';
import LogoutButton from './Logout/LogoutButton';
import { api } from '@/api';
import { Cart } from '@/api/types/cart';
import { useCart } from '@/hooks/useCart';
import SimpleMenu from './SimpleMenu/SimpleMenu';

const FEATURED_CATEGORIES = [
  {
    href: '/category/smartphones',
    title: 'ΚΙΝΗΤΑ',
  },
  {
    href: '/category/smartwatches',
    title: 'SMARTWATCH',
  },
  {
    href: '/category/tablets',
    title: 'TABLET',
  },
  {
    href: '/category/accessories',
    title: 'ΑΞΕΣΟΥΑΡ',
  },
];

const NewNavbar = () => {
  const classes = useStyles();
  const router = useRouter();
  const currentPath = router.asPath;

  const [anchor, setAnchor] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = { role: 'notAdmin' };
  const authStatus: string = 'todo';
  const { cart, setCart } = useCart();

  // const authStatus = useAppSelector((state) => state.user.status);
  // const user = useAppSelector((state) => state.user.data);
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

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
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

  //     {/* <AdminPanelSettingsIcon fontSize="medium" style={{ verticalAlign: 'bottom', paddingBottom: 1 }} /> */}

  return (
    <div>
      <AppBar
        position={currentPath === '/' ? 'sticky' : 'static'}
        className={classes.helperBar}
        color="secondary"
        sx={{
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
            </Link>
          </Box>
          <div className={classes.grow} />
          <Box mr={12} className={classes.standardNavLinks}>
            <LinkButton href="/" sx={activeClass('/')}>
              ΑΡΧΙΚΗ
            </LinkButton>
            {FEATURED_CATEGORIES.map((category) => (
              <LinkButton
                key={category.title}
                href={category.href}
                sx={activeClass(category.href)}
              >
                {category.title}
              </LinkButton>
            ))}

            <LinkButton href="/products" sx={activeClass('/products')}>
              ΟΛΑ ΤΑ ΠΡΟΪΟΝΤΑ
            </LinkButton>
          </Box>
          <div>
            {user?.role === 'admin' && (
              <IconLinkButton
                aria-label="Admin panel"
                color="inherit"
                href="/dashboard"
              ></IconLinkButton>
            )}
            {authStatus === 'signedIn' && <LogoutButton />}
          </div>

          <SimpleMenu />
          {currentPath !== '/cart' && (
            <div>
              <IconLinkButton href="/cart" aria-label="Show cart items">
                <Badge badgeContent={cart?.totalItems} color="secondary">
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
