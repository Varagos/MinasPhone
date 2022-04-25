import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography, Button, Box, SwipeableDrawer } from '@material-ui/core';
import { ShoppingCart, Menu as MenuIcon, SettingsInputAntennaTwoTone } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { Phone, PersonOutline } from '@material-ui/icons';

import newLogo from '../../assets/free-logo-design (1).png';
import useStyles from './styles';
import AppDrawer from './AppDrawer/AppDrawer';

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();
  const [anchor, setAnchor] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setAnchor(open);
  };

  function activeClass(currentPath) {
    if (location.pathname === currentPath) return classes.navLinkHome;
    return classes.navLink;
  }

  return (
    <div>
      <AppBar position="static" className={classes.helperBar}>
        <Toolbar variant="dense" className={classes.helperToolBar}>
          <Box>
            <Phone fontSize="inherit" color="primary" />
            <Box pl={2} style={{ display: 'inline-block' }}>
              <Typography variant="h6">210 9224 764</Typography>
            </Box>
          </Box>
          <Box>
            <PersonOutline fontSize="medium" color="primary" style={{ verticalAlign: 'bottom', paddingBottom: 1 }} />
            <Box ml={1} style={{ display: 'inline-block' }} color="text.disabled">
              <Typography>
                <Link className={classes.authLink} to="/login">
                  Σύνδεση
                </Link>{' '}
                ή{' '}
                <Link className={classes.authLink} to="/signup">
                  Δημιουργία Λογαριασμού
                </Link>
              </Typography>
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
            <Button className={activeClass('/')} component={Link} to="/">
              ΑΡΧΙΚΗ
            </Button>
            <Button className={activeClass('/category/smartphones')} component={Link} to="/category/smartphones">
              ΚΙΝΗΤΑ
            </Button>
            <Button className={activeClass('/category/smartwatches')} component={Link} to="/category/smartwatches">
              SMARTWATCH
            </Button>
            <Button className={activeClass('/category/tablets')} component={Link} to="/category/tablets">
              TABLET
            </Button>
            <Button className={activeClass('/category/accessories')} component={Link} to="/category/accessories">
              ΑΞΕΣΟΥΑΡ
            </Button>
            <Button className={activeClass('/products')} component={Link} to="/products">
              ALL PRODUCTS
            </Button>
          </Box>
          {location.pathname !== '/cart' && (
            <div className={classes.button}>
              <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
          <IconButton color="inherit" aria-label="menu" className={classes.menuButton} onClick={toggleDrawer(true)}>
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
