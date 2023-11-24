import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';

import newLogo from '../../../public/free-logo-design.png';
import svgLogo from '../../../public/free-logo.svg';
import AppDrawer from './AppDrawer/AppDrawer';
import {
  AppBar,
  Badge,
  Box,
  ClickAwayListener,
  IconButton,
  SxProps,
  Toolbar,
  Typography,
} from '@mui/material';

import Phone from '@mui/icons-material/Phone';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import IconLinkButton from '../common/IconLinkButton';
import LinkButton from '../common/LinkButton';
import { useCart } from '@/hooks/useCart';
import SimpleMenu from './SimpleMenu/SimpleMenu';
import { SearchInputField, SearchPromptIcon } from './Search';
import AppTheme from '@/lib/theme';
import theme from '@/lib/theme';

const FEATURED_CATEGORIES = [
  {
    href: '/categories/smartphones',
    title: 'ΚΙΝΗΤΑ',
  },
  {
    href: '/categories/smartwatches',
    title: 'SMARTWATCH',
  },
  {
    href: '/categories/tablets',
    title: 'TABLET',
  },
  {
    href: '/categories/accessories',
    title: 'ΑΞΕΣΟΥΑΡ',
  },
];

const NewNavbar = () => {
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

  function activeClass(
    path: string,
    theme: typeof AppTheme
  ): Record<string, any> {
    const basePathWithOutQuery = currentPath.split('?')[0];
    const isActive = basePathWithOutQuery === path;

    return {
      textDecoration: 'none',
      color: isActive
        ? theme.palette.primary.dark
        : theme.palette.primary.contrastText,
      borderBottom: isActive
        ? `4.5px solid ${theme.palette.primary.contrastText}`
        : 'none', // Highlight the active item with an underline
      paddingBottom: '0.5rem',
      transition: 'all .7s ease-in-out',
      fontWeight: isActive ? 'bold' : 'normal',
      '&:hover': {
        color: isActive
          ? theme.palette.primary.dark
          : theme.palette.primary.dark,
        backgroundColor: isActive
          ? 'transparent'
          : theme.palette.secondary.main,
      },
    };
  }

  return (
    <nav>
      <AppBar
        position={currentPath === '/' ? 'sticky' : 'static'}
        color="secondary" // This will use the styleOverrides for colorSecondary
        sx={(theme) => ({
          display: 'block',
          [theme.breakpoints.down('sm')]: {
            display: 'none',
          },
          // display: { xs: 'none', md: 'block' },
          px: 2,
          minHeight: '48px',
        })}
      >
        <Toolbar
          variant="dense"
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Phone fontSize="inherit" color="primary" sx={{ color: 'black' }} />
            <Box pl={2} style={{ display: 'inline-block' }}>
              <Typography
                variant="h6"
                sx={(theme) => ({
                  color: theme.palette.secondary.contrastText,
                })}
              >
                210 9224 764
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <ClickAwayListener onClickAway={handleCloseSearch}>
        <AppBar
          position="static"
          color="inherit" // This will use the styleOverrides for colorInherit
          sx={(theme) => ({
            boxShadow: 'none',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            [theme.breakpoints.up('sm')]: {
              width: `calc(100% - ${0}px)`, // 0 = drawerWidth
              marginLeft: 0,
            },
          })}
        >
          <Toolbar>
            <Box
              color="inherit"
              sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end' }}
            >
              <Link href="/">
                <Image
                  src={svgLogo}
                  // src={newLogo}
                  alt="MinasPhone"
                  style={{ marginRight: '10px', display: 'block' }}
                />
              </Link>
            </Box>

            {!searchActive && (
              <>
                <div
                  style={{
                    flexGrow: 1,
                  }}
                />
                <Box
                  mr={12}
                  sx={(theme) => ({
                    [theme.breakpoints.down('md')]: {
                      display: 'none',
                    },
                  })}
                >
                  <LinkButton href="/" sx={(theme) => activeClass('/', theme)}>
                    ΑΡΧΙΚΗ
                  </LinkButton>
                  {FEATURED_CATEGORIES.map((category) => (
                    <LinkButton
                      key={category.title}
                      href={category.href}
                      sx={(theme) => activeClass(category.href, theme)}
                    >
                      {category.title}
                    </LinkButton>
                  ))}

                  <LinkButton
                    href="/products"
                    sx={(theme) => activeClass('/products', theme)}
                  >
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
                  <Badge
                    badgeContent={cart?.totalItems}
                    color="secondary"
                    sx={(theme) => ({
                      '& .MuiBadge-badge': {
                        backgroundColor: theme.palette.primary.dark, // SpaceCadetNavy
                        color: theme.palette.primary.contrastText, // Assuming CulturedWhite
                        // Additional styling to adjust the position or size of the badge
                      },
                    })}
                  >
                    <ShoppingCart color="secondary" />
                  </Badge>
                </IconLinkButton>
              </div>
            )}
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={(theme) => ({
                display: { xs: 'block', md: 'none' },
                [theme.breakpoints.up('md')]: {
                  display: 'none',
                },
              })}
            >
              <Badge>
                <MenuIcon fontSize="large" />
              </Badge>
            </IconButton>
            <AppDrawer anchor={anchor} toggleDrawer={toggleDrawer} />
          </Toolbar>
        </AppBar>
      </ClickAwayListener>
    </nav>
  );
};

export default NewNavbar;
