'use client';

import { useState } from 'react';
import styles from './styles.module.css';
import AppDrawer from './AppDrawer/AppDrawer';
import { Badge, IconButton } from '@mui/material';

import { Menu as MenuIcon } from '@mui/icons-material';

const MobileDrawer = () => {
  const [anchor, setAnchor] = useState(false);
  const toggleDrawer = (open: any) => (event: any) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setAnchor(open);
  };
  return (
    <main>
      <IconButton
        color="inherit"
        aria-label="menu"
        className={styles.menuButton}
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
    </main>
  );
};

export default MobileDrawer;
