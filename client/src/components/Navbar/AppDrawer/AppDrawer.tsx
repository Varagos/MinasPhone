'use client';
/* eslint-disable react/jsx-key */
import React from 'react';
import clsx from 'clsx';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Home from '@mui/icons-material/Home';
import Smartphone from '@mui/icons-material/Smartphone';
import Watch from '@mui/icons-material/Watch';
import SearchIcon from '@mui/icons-material/Search';
import LocalShipping from '@mui/icons-material/LocalShipping';
import TabletMac from '@mui/icons-material/TabletMac';
import Headset from '@mui/icons-material/Headset';
import Storefront from '@mui/icons-material/Storefront';
import Lock from '@mui/icons-material/Lock';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Drawer from '@mui/material/Drawer';
import LinkListItem from '@/components/common/LinkListItem';
import LanguageSelector from '../LanguageSelector';

import { Root, classes } from './styles';

const drawerItems: [string, string, JSX.Element][] = [
  ['ΑΧΙΚΉ', '/', <Home />],
  ['ΚΙΝΗΤΑ', '/categories/smartphones', <Smartphone />],
  ['ACCESSORIES', '/categories/accessories', <Headset />],
  ['ΜΕΤΑΧΕΙΡΙΣΜΕΝΑ', '/categories/used-smartphones', <Smartphone />],
  ['ALL PRODUCTS', '/products', <Storefront />],
];

const drawerUtilities: [string, string, JSX.Element][] = [
  ['ΑΝΑΖΗΤΗΣΗ', '/search', <SearchIcon />],
  ['ORDER TRACKING', '/order-tracking', <LocalShipping />],
  ['ΣΥΝΔΕΣΗ', '/login', <Lock />],
  ['ΕΓΓΡΑΦΗ', '/signup', <PersonAdd />],
];

const AppDrawer = ({ anchor, toggleDrawer }: any) => {
  return (
    <Root>
      <React.Fragment key={anchor}>
        <Drawer anchor="right" open={anchor} onClose={toggleDrawer(false)}>
          <div
            className={clsx(classes.list, {
              [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {drawerItems.map(([text, to, icon], index) => (
                <LinkListItem key={text} href={to}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </LinkListItem>
              ))}
            </List>
            <Divider />
            <List>
              {drawerUtilities.map(([text, to, icon], index) => (
                <LinkListItem key={text} href={to}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </LinkListItem>
              ))}
              <div style={{ marginLeft: 14, marginTop: 30 }}>
                <LanguageSelector />
              </div>
            </List>
          </div>
        </Drawer>
      </React.Fragment>
    </Root>
  );
};

export default AppDrawer;
