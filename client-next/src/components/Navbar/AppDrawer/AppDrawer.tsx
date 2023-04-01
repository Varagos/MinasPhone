'use client';
import React from 'react';
import clsx from 'clsx';

// import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Home, Smartphone, Watch, TabletMac, Headset, Storefront, Lock, PersonAdd } from '@mui/icons-material';
import Drawer from '@mui/material/Drawer';
import styles from './styles.module.css';
import Link from 'next/link';

// const useStyles = makeStyles({
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   },
// });

const drawerItems: [string, string, JSX.Element][] = [
  ['ΑΧΙΚΉ', '/', <Home />],
  ['ΚΙΝΗΤΑ', '/category/smartphones', <Smartphone />],
  ['SMARTWATCH', '/category/smartwatches', <Watch />],
  ['TABLET', '/category/tablets', <TabletMac />],
  ['ACCESSORIES', '/category/accessories', <Headset />],
  ['ALL PRODUCTS', '/products', <Storefront />],
];

const drawerUtilities: [string, string, JSX.Element][] = [
  ['ΣΥΝΔΕΣΗ', '/login', <Lock />],
  ['ΕΓΓΡΑΦΗ', '/signup', <PersonAdd />],
];

const AppDrawer = ({ anchor, toggleDrawer }: any) => {
  // const classes = useStyles();

  return (
    <div>
      <React.Fragment key={anchor}>
        <Drawer anchor="right" open={anchor} onClose={toggleDrawer(false)}>
          <div
            className={clsx(styles.list, {
              [styles.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {drawerItems.map(([text, to, icon], index) => (
                <Link href={to} key={text} passHref>
                  <ListItem button>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
            <List>
              {drawerUtilities.map(([text, to, icon], index) => (
                <Link href={to} key={text} passHref>
                  <ListItem button>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default AppDrawer;