import styles from './styles.module.css';
import { AppBar, Badge, Box, Button, IconButton, Snackbar, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import MobileDrawer from './MobileDrawer';

import { Phone, ShoppingCart } from '@mui/icons-material';
import newLogo from '@/assets/logo-design.png';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavbarUserStatus from './NavbarUserStatus';

const Navbar = () => {
  const pathname = usePathname();

  function activeClass(currentPath: any): any {
    if (pathname === currentPath) {
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
    if (pathname === currentPath) return styles.navLinkHome;
    return styles.navLink;
  }

  return (
    <div>
      <AppBar
        position={pathname === '/' ? 'sticky' : 'static'}
        className={styles.helperBar}
        sx={{
          backgroundColor: '#ffce2a',
          display: { xs: 'none', md: 'block' },
          px: 8,
        }}
      >
        <Toolbar variant="dense" className={styles.helperToolBar}>
          <Box>
            <Phone fontSize="inherit" color="primary" sx={{ color: 'black' }} />
            <Box pl={2} style={{ display: 'inline-block' }}>
              <Typography variant="h6">210 9224 764</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <AppBar position="static" className={styles.appBar} color="inherit">
        <Toolbar>
          <Box className={styles.title} color="inherit">
            <Link
              className={styles.linkButton}
              style={{
                textDecoration: 'none',
                color: '#000',
              }}
              href="/"
              passHref
            >
              <Image className={styles.image} src={newLogo} alt="Picture of the author" />
            </Link>
          </Box>
          <div className={styles.grow} />
          <Box mr={12} className={styles.standardNavLinks}>
            <Link className={styles.linkButton} href="/" passHref>
              <Button sx={activeClass('/')}>ΑΡΧΙΚΗ</Button>
            </Link>
            <Link className={styles.linkButton} href="/category/smartphones" passHref>
              <Button sx={activeClass('/category/smartphones')}>ΚΙΝΗΤΑ</Button>
            </Link>
            <Link className={styles.linkButton} href="/category/smartwatches" passHref>
              <Button sx={activeClass('/category/smartwatches')}>SMARTWATCH</Button>
            </Link>
            <Link className={styles.linkButton} href="/category/tablets" passHref>
              <Button sx={activeClass('/category/tablets')}>TABLET</Button>
            </Link>
            <Link className={styles.linkButton} href="/category/accessories" passHref>
              <Button sx={activeClass('/category/accessories')}>ΑΞΕΣΟΥΑΡ</Button>
            </Link>
            <Link className={styles.linkButton} href="/category/products" passHref>
              <Button sx={activeClass('/products')}>ΟΛΑ ΤΑ ΠΡΟΪΟΝΤΑ</Button>
            </Link>
          </Box>
          <NavbarUserStatus />
          {pathname !== '/cart' && (
            <div>
              <Link
                href="/cart"
                passHref
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <IconButton aria-label="Show cart items" color="inherit">
                  <Badge
                    badgeContent={
                      0
                      // TODO: fix this
                      // cart?.total_items
                    }
                    color="secondary"
                  >
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Link>
            </div>
          )}
          <MobileDrawer />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
