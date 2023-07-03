import React from 'react';
import { IconButton } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
// import { signOut } from 'supertokens-auth-react/recipe/emailpassword';
import { useAppDispatch } from '@/redux/store';
import { userSignedOut } from '@/redux/slices/userSlice';
import IconLinkButton from '@/components/custom-components/IconLinkButton';
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onLogout = async () => {
    // await signOut();
    router.push('/');
    dispatch(userSignedOut());
  };

  return (
    <IconLinkButton aria-label="Logout user" color="inherit" href="/" onClick={onLogout}>
      <LogoutIcon
        fontSize="medium"
        // color="black"
        style={{ verticalAlign: 'bottom', paddingBottom: 1 }}
      />
    </IconLinkButton>
  );
};

export default LogoutButton;
