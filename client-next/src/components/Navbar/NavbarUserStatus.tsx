'use client';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import AppDrawer from './AppDrawer/AppDrawer';
import { Alert, AppBar, Badge, Box, Button, IconButton, Snackbar, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import MobileDrawer from './MobileDrawer';

import { PersonOutline, Phone, ShoppingCart, Menu as MenuIcon } from '@mui/icons-material';
import newLogo from '@/assets/free-logo-design (1).png';
// import LoginForm from '../Register/LoginDialog/LoginForm';

// import { doesSessionExist } from 'supertokens-auth-react/recipe/session';
// import Session from 'supertokens-auth-react/recipe/session';

import LogoutButton from './Logout/LogoutButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavbarUserStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //   useEffect(() => {
  //     (async () => {
  //       const res = await doesSessionExist();
  //       setIsLoggedIn(res);
  //       // console.log('RES IS ', res);
  //       if (res === true) {
  //         dispatch(userSignedIn());
  //         const userId = await Session.getUserId();
  //         const accessTokenPayload = await Session.getAccessTokenPayloadSecurely();

  //         dispatch(userFetched({ ...accessTokenPayload, userId }));
  //       } else dispatch(userSignedOut());
  //     })();
  //   }, []);
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton />
      ) : (
        <Link style={{ textDecoration: 'none', color: 'inherit' }} href="/auth" passHref>
          <IconButton aria-label="Login user" color="inherit">
            <PersonOutline
              fontSize="medium"
              // color="black"
              style={{ verticalAlign: 'bottom', paddingBottom: 1 }}
            />
          </IconButton>
        </Link>
      )}
    </div>
  );
};

export default NavbarUserStatus;
