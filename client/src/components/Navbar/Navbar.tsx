import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';

import newLogo from '../../../public/free-logo-design_1.png';
import useStyles from './styles';
import AppDrawer from './AppDrawer/AppDrawer';
import {
  AppBar,
  Badge,
  Box,
  ClickAwayListener,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  alpha,
  styled,
} from '@mui/material';

import Phone from '@mui/icons-material/Phone';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import IconLinkButton from '../custom-components/IconLinkButton';
import LinkButton from '../custom-components/LinkButton';
import LogoutButton from './Logout/LogoutButton';
import { api } from '@/api';
import { Cart } from '@/api/types/cart';
import { useCart } from '@/hooks/useCart';
import SimpleMenu from './SimpleMenu/SimpleMenu';
import SearchIcon from '@mui/icons-material/Search';
import { SearchInputField, SearchPromptIcon } from './Search';

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

  const [searchActive, setSearchActive] = useState(false);

  const handleSearchToggle = () => {
    setSearchActive((prev) => !prev);
  };

  const handleCloseSearch = () => {
    setSearchActive(false);
  };

  const { cart } = useCart();

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
      <ClickAwayListener onClickAway={handleCloseSearch}>
        <AppBar position="static" className={classes.appBar} color="inherit">
          <Toolbar>
            <Box className={classes.title} color="inherit">
              <Link href="/">
                <Image
                  src={newLogo}
                  alt="MinasPhone"
                  className={classes.image}
                />
              </Link>
            </Box>

            {!searchActive && (
              <>
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
              </>
            )}
            {searchActive ? (
              <SearchInputField />
            ) : (
              <SearchPromptIcon handleSearchToggle={handleSearchToggle} />
            )}

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
      </ClickAwayListener>
    </div>
  );
};

export default NewNavbar;
